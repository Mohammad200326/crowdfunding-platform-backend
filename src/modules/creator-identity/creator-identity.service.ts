import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import {
  CreateCreatorIdentityDTO,
  CreateCreatorIdentityResponse,
  CreatorIdentityUpdateFiles,
  UpdateCreatorIdentityDTO,
  UpdateCreatorIdentityResponse,
} from './dto/creator-identity.dto';
import { AssetKind, Prisma } from '@prisma/client';
import { FileService } from '../file/file.service';
import { UserResponseDTO } from '../auth/dto/auth.dto';

@Injectable()
export class CreatorIdentityService {
  constructor(
    private databaseService: DatabaseService,
    private fileService: FileService,
  ) {}

  async create(
    dto: CreateCreatorIdentityDTO,
    user: UserResponseDTO['userData'],
    files: {
      idFront: Express.Multer.File[];
      idBack: Express.Multer.File[];
      selfieWithId: Express.Multer.File[];
    },
  ): Promise<CreateCreatorIdentityResponse> {
    const creator = await this.databaseService.campaignCreator.findUnique({
      where: { userId: user.id },
      select: { id: true, type: true },
    });
    if (!creator) throw new NotFoundException('Campaign creator not found');

    if (creator.type !== 'INDIVIDUAL') {
      throw new ConflictException(
        'Identity verification is only for individual campaign creators',
      );
    }

    const exists = await this.databaseService.creatorIdentity.findUnique({
      where: { creatorId: creator.id },
      select: { id: true },
    });
    if (exists) throw new ConflictException('Creator identity already exists');

    const front = files?.idFront?.[0];
    const back = files?.idBack?.[0];
    const selfie = files?.selfieWithId?.[0];

    if (!front || !back || !selfie) {
      throw new ConflictException('All identity files are required');
    }

    const result = await this.databaseService.$transaction(async (tx) => {
      const creatorIdentity = await tx.creatorIdentity.create({
        data: {
          creatorId: creator.id,
          fullNameOnId: dto.fullNameOnId,
          idNumber: dto.idNumber ?? null,
        },
        select: { id: true, creatorId: true, createdAt: true },
      });

      const assets: Prisma.AssetUncheckedCreateInput[] = [];

      assets.push(
        this.fileService.createFileAssetData(
          front,
          user.id,
          AssetKind.CREATOR_ID_FRONT,
          undefined,
          creatorIdentity.id,
        ),
      );
      assets.push(
        this.fileService.createFileAssetData(
          back,
          user.id,
          AssetKind.CREATOR_ID_BACK,
          undefined,
          creatorIdentity.id,
        ),
      );
      assets.push(
        this.fileService.createFileAssetData(
          selfie,
          user.id,
          AssetKind.CREATOR_ID_SELFIE_WITH_ID,
          undefined,
          creatorIdentity.id,
        ),
      );

      await tx.asset.createMany({ data: assets });

      return creatorIdentity;
    });
    return {
      message: 'Creator identity created successfully',
      creatorIdentity: result,
    };
  }

  async getByCreatorId(creatorId: string) {
    const creatorIdentity =
      await this.databaseService.creatorIdentity.findUnique({
        where: { creatorId },
        include: {
          assets: {
            where: {
              kind: {
                in: [
                  AssetKind.CREATOR_ID_FRONT,
                  AssetKind.CREATOR_ID_BACK,
                  AssetKind.CREATOR_ID_SELFIE_WITH_ID,
                ],
              },
            },
            orderBy: { createdAt: 'desc' },
            select: {
              id: true,
              kind: true,
              url: true,
              fileType: true,
              fileSizeInKB: true,
              createdAt: true,
            },
          },
        },
      });

    if (!creatorIdentity)
      throw new NotFoundException('Creator identity not found');

    return { creatorIdentity };
  }

  async updateByCreatorId(
    creatorId: string,
    dto: UpdateCreatorIdentityDTO,
    files?: CreatorIdentityUpdateFiles,
  ): Promise<UpdateCreatorIdentityResponse> {
    const existing = await this.databaseService.creatorIdentity.findUnique({
      where: { creatorId },
      select: {
        id: true,
        creatorId: true,
        creator: { select: { userId: true } },
      },
    });

    // If no existing identity, create a new one instead of throwing an error
    if (!existing) {
      const creator = await this.databaseService.campaignCreator.findUnique({
        where: { id: creatorId },
        select: { userId: true },
      });

      if (!creator) throw new NotFoundException('Campaign creator not found');

      const front = files?.idFront?.[0];
      const back = files?.idBack?.[0];
      const selfie = files?.selfieWithId?.[0];

      if (!front || !back || !selfie) {
        throw new NotFoundException(
          'idFront, idBack, and selfieWithId files are all required to create a new identity',
        );
      }

      const result = await this.databaseService.$transaction(async (tx) => {
        const creatorIdentity = await tx.creatorIdentity.create({
          data: {
            creatorId,
            fullNameOnId: dto.fullNameOnId ?? '',
            idNumber: dto.idNumber ?? null,
          },
          select: {
            id: true,
            creatorId: true,
            fullNameOnId: true,
            idNumber: true,
            updatedAt: true,
          },
        });

        const ownerId = creator.userId;
        const assetsToCreate: Prisma.AssetUncheckedCreateInput[] = [];

        if (front) {
          assetsToCreate.push(
            this.fileService.createFileAssetData(
              front,
              ownerId,
              AssetKind.CREATOR_ID_FRONT,
              undefined,
              creatorIdentity.id,
            ),
          );
        }
        if (back) {
          assetsToCreate.push(
            this.fileService.createFileAssetData(
              back,
              ownerId,
              AssetKind.CREATOR_ID_BACK,
              undefined,
              creatorIdentity.id,
            ),
          );
        }
        if (selfie) {
          assetsToCreate.push(
            this.fileService.createFileAssetData(
              selfie,
              ownerId,
              AssetKind.CREATOR_ID_SELFIE_WITH_ID,
              undefined,
              creatorIdentity.id,
            ),
          );
        }

        if (assetsToCreate.length) {
          await tx.asset.createMany({ data: assetsToCreate });
        }

        return creatorIdentity;
      });

      return {
        message: 'Creator identity created successfully',
        creatorIdentity: result,
      };
    }

    const front = files?.idFront?.[0];
    const back = files?.idBack?.[0];
    const selfie = files?.selfieWithId?.[0];

    const kindsToReplace: AssetKind[] = [];
    if (front) kindsToReplace.push(AssetKind.CREATOR_ID_FRONT);
    if (back) kindsToReplace.push(AssetKind.CREATOR_ID_BACK);
    if (selfie) kindsToReplace.push(AssetKind.CREATOR_ID_SELFIE_WITH_ID);

    const result = await this.databaseService.$transaction(async (tx) => {
      const updatedIdentity = await tx.creatorIdentity.update({
        where: { id: existing.id },
        data: {
          ...(dto.fullNameOnId !== undefined
            ? { fullNameOnId: dto.fullNameOnId }
            : {}),
          ...(dto.idNumber !== undefined ? { idNumber: dto.idNumber } : {}),
        },
        select: {
          id: true,
          creatorId: true,
          fullNameOnId: true,
          idNumber: true,
          updatedAt: true,
        },
      });

      if (kindsToReplace.length) {
        await tx.asset.deleteMany({
          where: {
            creatorIdentityId: existing.id,
            kind: { in: kindsToReplace },
          },
        });

        const ownerId = existing.creator.userId;
        const assetsToCreate: Prisma.AssetUncheckedCreateInput[] = [];

        if (front) {
          assetsToCreate.push(
            this.fileService.createFileAssetData(
              front,
              ownerId,
              AssetKind.CREATOR_ID_FRONT,
              undefined,
              existing.id,
            ),
          );
        }

        if (back) {
          assetsToCreate.push(
            this.fileService.createFileAssetData(
              back,
              ownerId,
              AssetKind.CREATOR_ID_BACK,
              undefined,
              existing.id,
            ),
          );
        }

        if (selfie) {
          assetsToCreate.push(
            this.fileService.createFileAssetData(
              selfie,
              ownerId,
              AssetKind.CREATOR_ID_SELFIE_WITH_ID,
              undefined,
              existing.id,
            ),
          );
        }

        if (assetsToCreate.length) {
          await tx.asset.createMany({ data: assetsToCreate });
        }
      }

      return updatedIdentity;
    });

    return {
      message: 'Creator identity updated successfully',
      creatorIdentity: result,
    };
  }

  remove(creatorId: string) {
    return this.databaseService.creatorIdentity.delete({
      where: {
        id: creatorId,
      },
    });
  }
}
