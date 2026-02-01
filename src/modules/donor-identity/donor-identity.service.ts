import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import {
  CreateDonorIdentityDTO,
  CreateDonorIdentityResponse,
  DonorIdentityUpdateFiles,
  UpdateDonorIdentityDTO,
  UpdateDonorIdentityResponse,
} from './dto/donor-identity.dto';
import { AssetKind, Prisma } from '@prisma/client';
import { FileService } from '../file/file.service';

@Injectable()
export class DonorIdentityService {
  constructor(
    private databaseService: DatabaseService,
    private fileService: FileService,
  ) {}

  async create(
    dto: CreateDonorIdentityDTO,
    files: {
      idFront: Express.Multer.File[];
      idBack: Express.Multer.File[];
      selfieWithId: Express.Multer.File[];
    },
  ): Promise<CreateDonorIdentityResponse> {
    const donor = await this.databaseService.donor.findUnique({
      where: { id: dto.donorId },
      select: { id: true, userId: true },
    });
    if (!donor) throw new NotFoundException('Donor not found');

    const exists = await this.databaseService.donorIdentity.findUnique({
      where: { donorId: dto.donorId },
      select: { id: true },
    });
    if (exists) throw new ConflictException('Donor identity already exists');

    const front = files?.idFront?.[0];
    const back = files?.idBack?.[0];
    const selfie = files?.selfieWithId?.[0];

    if (!front || !back || !selfie) {
      throw new ConflictException('All identity files are required');
    }

    const result = await this.databaseService.$transaction(async (tx) => {
      const donorIdentity = await tx.donorIdentity.create({
        data: {
          donorId: dto.donorId,
          fullNameOnId: dto.fullNameOnId,
          idNumber: dto.idNumber ?? null,
        },
        select: { id: true, donorId: true, createdAt: true },
      });

      const assets: Prisma.AssetUncheckedCreateInput[] = [];

      assets.push(
        this.fileService.createFileAssetData(
          front,
          donor.userId,
          AssetKind.DONOR_ID_FRONT,
          donorIdentity.id,
        ),
      );
      assets.push(
        this.fileService.createFileAssetData(
          back,
          donor.userId,
          AssetKind.DONOR_ID_BACK,
          donorIdentity.id,
        ),
      );
      assets.push(
        this.fileService.createFileAssetData(
          selfie,
          donor.userId,
          AssetKind.DONOR_ID_SELFIE_WITH_ID,
          donorIdentity.id,
        ),
      );

      await tx.asset.createMany({ data: assets });

      return donorIdentity;
    });
    return {
      message: 'Donor identity created successfully',
      donorIdentity: result,
    };
  }

  async getByDonorId(donorId: string) {
    const donorIdentity = await this.databaseService.donorIdentity.findUnique({
      where: { donorId },
      include: {
        assets: {
          where: {
            kind: {
              in: [
                AssetKind.DONOR_ID_FRONT,
                AssetKind.DONOR_ID_BACK,
                AssetKind.DONOR_ID_SELFIE_WITH_ID,
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

    if (!donorIdentity) throw new NotFoundException('Donor identity not found');

    return { donorIdentity };
  }

  async updateByDonorId(
    donorId: string,
    dto: UpdateDonorIdentityDTO,
    files?: DonorIdentityUpdateFiles,
  ): Promise<UpdateDonorIdentityResponse> {
    const existing = await this.databaseService.donorIdentity.findUnique({
      where: { donorId },
      select: {
        id: true,
        donorId: true,
        donor: { select: { userId: true } },
      },
    });

    if (!existing) {
      throw new NotFoundException('Donor identity not found for this donor');
    }

    const front = files?.idFront?.[0];
    const back = files?.idBack?.[0];
    const selfie = files?.selfieWithId?.[0];

    const kindsToReplace: AssetKind[] = [];
    if (front) kindsToReplace.push(AssetKind.DONOR_ID_FRONT);
    if (back) kindsToReplace.push(AssetKind.DONOR_ID_BACK);
    if (selfie) kindsToReplace.push(AssetKind.DONOR_ID_SELFIE_WITH_ID);

    const result = await this.databaseService.$transaction(async (tx) => {
      const updatedIdentity = await tx.donorIdentity.update({
        where: { id: existing.id },
        data: {
          ...(dto.fullNameOnId !== undefined
            ? { fullNameOnId: dto.fullNameOnId }
            : {}),
          ...(dto.idNumber !== undefined ? { idNumber: dto.idNumber } : {}),
        },
        select: {
          id: true,
          donorId: true,
          fullNameOnId: true,
          idNumber: true,
          updatedAt: true,
        },
      });

      if (kindsToReplace.length) {
        await tx.asset.deleteMany({
          where: {
            donorIdentityId: existing.id,
            kind: { in: kindsToReplace },
          },
        });

        const ownerId = existing.donor.userId;
        const assetsToCreate: Prisma.AssetUncheckedCreateInput[] = [];

        if (front) {
          assetsToCreate.push(
            this.fileService.createFileAssetData(
              front,
              ownerId,
              AssetKind.DONOR_ID_FRONT,
              existing.id,
            ),
          );
        }

        if (back) {
          assetsToCreate.push(
            this.fileService.createFileAssetData(
              back,
              ownerId,
              AssetKind.DONOR_ID_BACK,
              existing.id,
            ),
          );
        }

        if (selfie) {
          assetsToCreate.push(
            this.fileService.createFileAssetData(
              selfie,
              ownerId,
              AssetKind.DONOR_ID_SELFIE_WITH_ID,
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
      message: 'Donor identity updated successfully',
      donorIdentity: result,
    };
  }

  remove(donorId: string) {
    return this.databaseService.donorIdentity.delete({
      where: {
        id: donorId,
      },
    });
  }
}
