import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateDonorIdentityDto } from './dto/update-donor-identity.dto';
import { DatabaseService } from '../database/database.service';
import {
  CreateDonorIdentityDTO,
  CreateDonorIdentityResponse,
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

  findByUserId(donorId: string) {
    return this.databaseService.donorIdentity.findUniqueOrThrow({
      where: {
        id: donorId,
      },
    });
  }

  update(id: number, updateDonorIdentityDto: UpdateDonorIdentityDto) {
    return `This action updates a #${id} donorIdentity`;
  }

  remove(donorId: string) {
    return this.databaseService.donorIdentity.delete({
      where: {
        id: donorId,
      },
    });
  }
}
