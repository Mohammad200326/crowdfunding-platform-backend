import {
  Injectable,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateCampaignCreatorDto } from './dto/create-campaign-creator.dto';
import { UpdateCampaignCreatorDto } from './dto/update-campaign-creator.dto';
import { CreatorType } from '@prisma/client';

@Injectable()
export class CampaignCreatorService {
  constructor(private databaseService: DatabaseService) {}

  async create(dto: CreateCampaignCreatorDto) {
    const user = await this.databaseService.user.findUnique({
      where: { id: dto.userId },
    });
    if (!user) throw new BadRequestException('User not found');

    // Check for Duplicate
    const existing = await this.databaseService.campaignCreator.findUnique({
      where: { userId: dto.userId },
    });
    if (existing)
      throw new ConflictException(
        'Creator profile already exists for this user',
      );

    const isIndividual = dto.type === CreatorType.INDIVIDUAL;
    const filler = 'N/A';

    // Create Campaign Creator
    const creator = await this.databaseService.campaignCreator.create({
      data: {
        userId: dto.userId,
        type: dto.type,
        institutionName: dto.institutionName,
        institutionCountry: dto.institutionCountry,
        institutionType: isIndividual
          ? 'Individual'
          : dto.institutionType || filler,

        institutionDateOfEstablishment: dto.institutionDateOfEstablishment
          ? new Date(dto.institutionDateOfEstablishment)
          : new Date(),

        institutionLegalStatus: isIndividual
          ? filler
          : dto.institutionLegalStatus || filler,
        institutionTaxIdentificationNumber: isIndividual
          ? filler
          : dto.institutionTaxIdentificationNumber || filler,
        institutionRegistrationNumber: isIndividual
          ? filler
          : dto.institutionRegistrationNumber || filler,

        institutionRepresentativeName: isIndividual
          ? `${user.firstName} ${user.lastName}`
          : dto.institutionRepresentativeName || filler,

        institutionRepresentativePosition: isIndividual
          ? 'Owner'
          : dto.institutionRepresentativePosition || filler,
        institutionRepresentativeRegistrationNumber: isIndividual
          ? filler
          : dto.institutionRepresentativeRegistrationNumber || filler,

        institutionWebsite: isIndividual
          ? filler
          : dto.institutionWebsite || filler,
        institutionRepresentativeSocialMedia: isIndividual
          ? filler
          : dto.institutionRepresentativeSocialMedia || filler,
      },
    });

    return {
      message: 'Campaign creator profile created successfully',
      creator: {
        id: creator.id,
        userId: creator.userId,
        type: creator.type,
        institutionCountry: creator.institutionCountry,
        institutionType: creator.institutionType,
        createdAt: creator.createdAt,
      },
    };
  }

  async findAll() {
    return this.databaseService.campaignCreator.findMany({
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            role: true,
            country: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    const creator = await this.databaseService.campaignCreator.findUnique({
      where: { id },
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

    if (!creator) {
      throw new BadRequestException('Campaign creator not found');
    }

    return creator;
  }

  update(id: number, updateCampaignCreatorDto: UpdateCampaignCreatorDto) {
    return `This action updates a #${id} campaignCreator`;
  }

  remove(id: number) {
    return `This action removes a #${id} campaignCreator`;
  }
}
