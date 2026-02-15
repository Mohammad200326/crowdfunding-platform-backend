import {
  Injectable,
  BadRequestException,
  ConflictException,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateCampaignCreatorDto } from './dto/create-campaign-creator.dto';
import { UpdateCampaignCreatorDto } from './dto/update-campaign-creator.dto';
import { UserRole, Prisma, User } from '@prisma/client';

@Injectable()
export class CampaignCreatorService {
  private readonly logger = new Logger(CampaignCreatorService.name);

  constructor(private readonly db: DatabaseService) {}

  async create(dto: CreateCampaignCreatorDto) {
    const { userId, assetIds } = dto;

    const user = await this.db.user.findUnique({
      where: { id: userId, isDeleted: false },
    });

    if (!user) {
      throw new NotFoundException('User not found or is deactivated');
    }

    const existingCreator = await this.db.campaignCreator.findUnique({
      where: { userId },
    });
    if (existingCreator) {
      throw new ConflictException(
        'Creator profile already exists for this user',
      );
    }

    if (assetIds && assetIds.length > 0) {
      const assets = await this.db.asset.findMany({
        where: { id: { in: assetIds }, ownerId: userId },
      });
      if (assets.length !== assetIds.length) {
        throw new BadRequestException('Invalid assets provided');
      }
    }

    const persistenceData = this.preparePersistenceData(dto, user);

    return this.db.$transaction(async (tx) => {
      const creator = await tx.campaignCreator.create({
        data: persistenceData,
        include: { user: true },
      });

      await tx.user.update({
        where: { id: userId },
        data: { role: UserRole.CAMPAIGN_CREATOR },
      });

      if (assetIds?.length) {
        await tx.asset.updateMany({
          where: { id: { in: assetIds } },
          data: { creatorId: creator.id },
        });
      }

      return creator;
    });
  }

  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const whereClause: Prisma.CampaignCreatorWhereInput = {
      user: { isDeleted: false },
    };

    const [creators, total] = await Promise.all([
      this.db.campaignCreator.findMany({
        skip,
        take: limit,
        where: whereClause,
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              country: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.db.campaignCreator.count({ where: whereClause }),
    ]);

    return {
      data: creators,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async findOne(id: string) {
    const creator = await this.db.campaignCreator.findUnique({
      where: { id },
      include: {
        user: true,
        assets: true,
      },
    });

    if (!creator || creator.user.isDeleted) {
      throw new NotFoundException('Creator not found');
    }

    return creator;
  }

  async update(id: string, dto: UpdateCampaignCreatorDto) {
    await this.findOne(id);

    const updateData: Prisma.CampaignCreatorUpdateInput = {};

    if (dto.institutionName !== undefined) {
      updateData.institutionName = dto.institutionName;
    }
    if (dto.institutionCountry !== undefined) {
      updateData.institutionCountry = dto.institutionCountry;
    }
    if (dto.institutionType !== undefined) {
      updateData.institutionType = dto.institutionType;
    }
    if (dto.institutionLegalStatus !== undefined) {
      updateData.institutionLegalStatus = dto.institutionLegalStatus;
    }
    if (dto.institutionTaxIdentificationNumber !== undefined) {
      updateData.institutionTaxIdentificationNumber =
        dto.institutionTaxIdentificationNumber;
    }
    if (dto.institutionRegistrationNumber !== undefined) {
      updateData.institutionRegistrationNumber =
        dto.institutionRegistrationNumber;
    }
    if (dto.institutionRepresentativeName !== undefined) {
      updateData.institutionRepresentativeName =
        dto.institutionRepresentativeName;
    }
    if (dto.institutionRepresentativePosition !== undefined) {
      updateData.institutionRepresentativePosition =
        dto.institutionRepresentativePosition;
    }
    if (dto.institutionRepresentativeRegistrationNumber !== undefined) {
      updateData.institutionRepresentativeRegistrationNumber =
        dto.institutionRepresentativeRegistrationNumber;
    }
    if (dto.institutionWebsite !== undefined) {
      updateData.institutionWebsite = dto.institutionWebsite;
    }
    if (dto.institutionRepresentativeSocialMedia !== undefined) {
      updateData.institutionRepresentativeSocialMedia =
        dto.institutionRepresentativeSocialMedia;
    }
    if (dto.institutionDateOfEstablishment !== undefined) {
      updateData.institutionDateOfEstablishment = new Date(
        dto.institutionDateOfEstablishment,
      );
    }

    return this.db.campaignCreator.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(id: string) {
    const creator = await this.findOne(id);

    const activeCampaigns = await this.db.campaign.count({
      where: {
        creatorId: creator.userId,
        isActive: true,
        isDeleted: false,
      },
    });

    if (activeCampaigns > 0) {
      throw new ConflictException(
        'Cannot deactivate creator with active campaigns. Please close/finish campaigns first.',
      );
    }

    await this.db.user.update({
      where: { id: creator.userId },
      data: { isDeleted: true },
    });

    return { message: 'Creator account deactivated successfully' };
  }

  private preparePersistenceData(
    dto: CreateCampaignCreatorDto,
    user: User,
  ): Prisma.CampaignCreatorCreateInput {
    const FILLER = 'N/A';

    if (dto.type === 'INDIVIDUAL') {
      return {
        user: { connect: { id: dto.userId } },
        type: 'INDIVIDUAL',
        institutionName: `${user.firstName} ${user.lastName}`,
        institutionCountry: user.country || FILLER,
        institutionType: 'Individual',
        institutionDateOfEstablishment: new Date(),
        institutionLegalStatus: FILLER,
        institutionTaxIdentificationNumber: FILLER,
        institutionRegistrationNumber: FILLER,
        institutionRepresentativeName: `${user.firstName} ${user.lastName}`,
        institutionRepresentativePosition: 'Owner',
        institutionRepresentativeRegistrationNumber: FILLER,
        institutionWebsite: FILLER,
        institutionRepresentativeSocialMedia: FILLER,
      };
    }

    return {
      user: { connect: { id: dto.userId } },
      type: 'INSTITUTION',
      institutionName: dto.institutionName,
      institutionCountry: dto.institutionCountry,
      institutionType: dto.institutionType,
      institutionDateOfEstablishment: dto.institutionDateOfEstablishment,
      institutionLegalStatus: dto.institutionLegalStatus,
      institutionTaxIdentificationNumber:
        dto.institutionTaxIdentificationNumber,
      institutionRegistrationNumber: dto.institutionRegistrationNumber,
      institutionRepresentativeName: dto.institutionRepresentativeName,
      institutionRepresentativePosition: dto.institutionRepresentativePosition,
      institutionRepresentativeRegistrationNumber:
        dto.institutionRepresentativeRegistrationNumber,
      institutionWebsite: dto.institutionWebsite || FILLER,
      institutionRepresentativeSocialMedia:
        dto.institutionRepresentativeSocialMedia || FILLER,
    };
  }
}
