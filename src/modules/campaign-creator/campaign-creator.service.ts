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
import { UserRole, Prisma } from '@prisma/client';

// Type for user data from database
interface UserSelectData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  country: string | null;
  role: UserRole;
  isDeleted: boolean;
}

@Injectable()
export class CampaignCreatorService {
  private readonly logger = new Logger(CampaignCreatorService.name);

  constructor(private readonly db: DatabaseService) {}

  async create(dto: CreateCampaignCreatorDto) {
    const { userId, assetIds } = dto;

    const user = await this.db.user.findUnique({
      where: { id: userId, isDeleted: false },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        country: true,
        role: true,
        isDeleted: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found or has been deleted');
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
        where: {
          id: { in: assetIds },
          ownerId: userId,
        },
      });

      if (assets.length !== assetIds.length) {
        throw new BadRequestException(
          'Some assets not found or do not belong to this user',
        );
      }
    }

    const persistenceData = this.preparePersistenceData(dto, user);

    return this.db.$transaction(async (tx) => {
      // Create the campaign creator profile
      const creator = await tx.campaignCreator.create({
        data: persistenceData,
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              role: true,
              country: true,
              phoneNumber: true,
            },
          },
        },
      });

      // Promote user role to CAMPAIGN_CREATOR
      await tx.user.update({
        where: { id: userId },
        data: { role: UserRole.CAMPAIGN_CREATOR },
      });

      // Link assets to creator
      if (assetIds && assetIds.length > 0) {
        await tx.asset.updateMany({
          where: { id: { in: assetIds } },
          data: { creatorId: creator.id },
        });
      }

      this.logger.log(`Created ${dto.type} creator profile for user ${userId}`);

      return {
        message: 'Campaign creator profile created successfully',
        creator,
      };
    });
  }

  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [creators, total] = await Promise.all([
      this.db.campaignCreator.findMany({
        skip,
        take: limit,
        where: {
          user: {
            isDeleted: false,
          },
        },
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              role: true,
              country: true,
              phoneNumber: true,
              isVerified: true,
              verificationStatus: true,
            },
          },
          assets: {
            select: {
              id: true,
              url: true,
              fileType: true,
              kind: true,
              createdAt: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.db.campaignCreator.count({
        where: {
          user: {
            isDeleted: false,
          },
        },
      }),
    ]);

    return {
      data: creators,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const creator = await this.db.campaignCreator.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            role: true,
            country: true,
            phoneNumber: true,
            dateOfBirth: true,
            isDeleted: true,
            isVerified: true,
            verificationStatus: true,
          },
        },
        assets: {
          select: {
            id: true,
            url: true,
            fileType: true,
            kind: true,
            createdAt: true,
          },
        },
      },
    });

    if (!creator) {
      throw new NotFoundException(
        `Campaign creator profile with ID "${id}" not found`,
      );
    }

    // Check if user is deleted
    if (creator.user.isDeleted) {
      throw new NotFoundException(
        `Campaign creator profile with ID "${id}" has been deleted`,
      );
    }

    return creator;
  }

  async findByUserId(userId: string) {
    const creator = await this.db.campaignCreator.findUnique({
      where: { userId },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            role: true,
            country: true,
            phoneNumber: true,
            isDeleted: true,
          },
        },
        assets: {
          select: {
            id: true,
            url: true,
            fileType: true,
            kind: true,
          },
        },
      },
    });

    if (!creator) {
      throw new NotFoundException(
        `Campaign creator for user "${userId}" not found`,
      );
    }

    // Check if user is deleted
    if (creator.user.isDeleted) {
      throw new NotFoundException(
        `Campaign creator for user "${userId}" has been deleted`,
      );
    }

    return creator;
  }

  async update(id: string, dto: UpdateCampaignCreatorDto) {
    // Verify creator exists and is not deleted
    await this.findOne(id);

    // Prepare update data with proper Prisma typing
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
    if (dto.institutionDateOfEstablishment !== undefined) {
      updateData.institutionDateOfEstablishment = new Date(
        dto.institutionDateOfEstablishment,
      );
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

    const updatedCreator = await this.db.campaignCreator.update({
      where: { id },
      data: updateData,
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            role: true,
          },
        },
        assets: true,
      },
    });

    this.logger.log(`Updated creator profile ${id}`);

    return {
      message: 'Campaign creator profile updated successfully',
      creator: updatedCreator,
    };
  }

  async remove(id: string) {
    const creator = await this.findOne(id);

    // Check if creator has any active campaigns
    const activeCampaignsCount = await this.db.campaign.count({
      where: {
        creatorId: creator.userId,
        isActive: true,
        isDeleted: false,
      },
    });

    if (activeCampaignsCount > 0) {
      throw new ConflictException(
        `Cannot delete creator profile with ${activeCampaignsCount} active campaign(s). ` +
          'Please deactivate all campaigns first.',
      );
    }

    // TRANSACTION: delete user
    return this.db.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: creator.userId },
        data: {
          isDeleted: true,
        },
      });

      this.logger.log(`Deleted creator profile ${id} (user ${creator.userId})`);

      return {
        message: 'Campaign creator profile deleted successfully',
        deletedId: id,
      };
    });
  }

  private preparePersistenceData(
    dto: CreateCampaignCreatorDto,
    user: UserSelectData,
  ): Prisma.CampaignCreatorCreateInput {
    const filler = 'N/A';

    // Check if INDIVIDUAL type (use string comparison to avoid namespace error)
    const isIndividual = dto.type === 'INDIVIDUAL';

    if (isIndividual) {
      // For INDIVIDUAL: Auto-fill all fields
      return {
        user: {
          connect: { id: dto.userId },
        },
        type: 'INDIVIDUAL',
        institutionName: `${user.firstName} ${user.lastName}`,
        institutionCountry: user.country || filler,
        institutionType: 'Individual',
        institutionDateOfEstablishment: new Date(),
        institutionLegalStatus: filler,
        institutionTaxIdentificationNumber: filler,
        institutionRegistrationNumber: filler,
        institutionRepresentativeName: `${user.firstName} ${user.lastName}`,
        institutionRepresentativePosition: 'Owner',
        institutionRepresentativeRegistrationNumber: filler,
        institutionWebsite: filler,
        institutionRepresentativeSocialMedia: filler,
      };
    }

    // For INSTITUTION: Use provided data
    if (dto.type !== 'INSTITUTION') {
      throw new BadRequestException('Invalid creator type');
    }

    return {
      user: {
        connect: { id: dto.userId },
      },
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
      institutionWebsite: dto.institutionWebsite || filler,
      institutionRepresentativeSocialMedia:
        dto.institutionRepresentativeSocialMedia || filler,
    };
  }
}
