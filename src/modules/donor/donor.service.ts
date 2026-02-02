import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDonorDto } from './dto/create-donor.dto';
import { DonorResponseDTO, UpdateDonorDTO } from './dto/donor.dto';
import { PaginatedResult, PaginationQueryType } from 'src/types/util.types';
import { User } from '@prisma/client';
import { removeFields } from 'src/utils/object.util';
import { DatabaseService } from '../database/database.service';
import { DonorIdentityUpdateFiles } from '../donor-identity/dto/donor-identity.dto';
import { DonorIdentityService } from '../donor-identity/donor-identity.service';

@Injectable()
export class DonorService {
  constructor(
    private readonly prismaService: DatabaseService,
    private readonly donorIdentityService: DonorIdentityService,
  ) {}

  create(createDonorDto: CreateDonorDto) {
    return 'This action adds a new donor';
  }

  async createDonorProfile(userId: string, donorProfileData: any, tx?: any) {
    const prisma = tx || this.prismaService;

    // Check if donor profile data was provided
    const hasCustomData =
      donorProfileData && Object.keys(donorProfileData).length > 0;

    // Create donor profile with default values if not provided
    const defaultProfile = {
      areasOfInterest: '',
      preferredCampaignTypes: '',
      geographicScope: 'local',
      targetAudience: '',
      preferredCampaignSize: 0,
      preferredCampaignVisibility: '',
    };

    const profile = await prisma.donor.create({
      data: {
        ...defaultProfile,
        ...donorProfileData,
        userId,
      },
    });

    // Return profile with flag indicating if custom data was provided
    return {
      ...profile,
      hasCustomData,
    };
  }

  findAll(
    query: PaginationQueryType,
  ): Promise<PaginatedResult<Omit<User, 'password'>>> {
    return this.prismaService.$transaction(async (prisma) => {
      const pagination = this.prismaService.handleQueryPagination(query);
      const donors = await prisma.user.findMany({
        where: { role: 'DONOR' },
        ...removeFields(pagination, ['page']),
        omit: {
          password: true,
        },
        include: { donorProfile: true },
      });

      const count = await prisma.user.count({ where: { role: 'DONOR' } });
      return {
        data: donors,
        ...this.prismaService.formatPaginationResponse({
          page: pagination.page,
          count,
          limit: pagination.take,
        }),
      };
    });
  }

  findOne(id: string) {
    return this.prismaService.donor.findUnique({
      where: { id },
      include: {
        user: { omit: { password: true } },
        identity: { include: { assets: true } },
      },
    });
  }

  async update(
    userId: string,
    updateDonorDto: UpdateDonorDTO,
    files?: DonorIdentityUpdateFiles,
  ): Promise<DonorResponseDTO> {
    // First, get the donor by userId
    const donorRecord = await this.prismaService.donor.findUnique({
      where: { userId },
      select: { id: true },
    });

    if (!donorRecord) {
      throw new NotFoundException('Donor not found for this user');
    }

    const donorId = donorRecord.id;

    // Extract identity fields from dto
    const { fullNameOnId, idNumber, donorProfile, ...userFields } =
      updateDonorDto;

    // Build identity update DTO if identity fields exist
    const identityDto = {
      ...(fullNameOnId !== undefined ? { fullNameOnId } : {}),
      ...(idNumber !== undefined ? { idNumber } : {}),
    };

    const hasIdentityUpdate =
      Object.keys(identityDto).length > 0 ||
      (files && Object.keys(files).length > 0);

    // Update donor identity if needed (uses its own transaction)
    if (hasIdentityUpdate) {
      await this.donorIdentityService.updateByDonorId(
        donorId,
        identityDto,
        files,
      );
    }

    // Update user and donor profile
    const updatedDonor = await this.prismaService.$transaction(async (tx) => {
      // Update user fields if any
      const userUpdateFields = {
        ...(userFields.firstName !== undefined
          ? { firstName: userFields.firstName }
          : {}),
        ...(userFields.lastName !== undefined
          ? { lastName: userFields.lastName }
          : {}),
        ...(userFields.email !== undefined ? { email: userFields.email } : {}),
        ...(userFields.dateOfBirth !== undefined
          ? { dateOfBirth: userFields.dateOfBirth }
          : {}),
        ...(userFields.phoneNumber !== undefined
          ? { phoneNumber: userFields.phoneNumber }
          : {}),
        ...(userFields.country !== undefined
          ? { country: userFields.country }
          : {}),
        ...(userFields.notes !== undefined ? { notes: userFields.notes } : {}),
      };

      if (Object.keys(userUpdateFields).length > 0) {
        await tx.user.update({
          where: { id: userId },
          data: userUpdateFields,
        });
      }

      // Update donor profile fields if any
      const donorProfileFields = {
        ...(donorProfile?.areasOfInterest !== undefined
          ? { areasOfInterest: donorProfile.areasOfInterest }
          : {}),
        ...(donorProfile?.preferredCampaignTypes !== undefined
          ? { preferredCampaignTypes: donorProfile.preferredCampaignTypes }
          : {}),
        ...(donorProfile?.geographicScope !== undefined
          ? { geographicScope: donorProfile.geographicScope }
          : {}),
        ...(donorProfile?.targetAudience !== undefined
          ? { targetAudience: donorProfile.targetAudience }
          : {}),
        ...(donorProfile?.preferredCampaignSize !== undefined
          ? { preferredCampaignSize: donorProfile.preferredCampaignSize }
          : {}),
        ...(donorProfile?.preferredCampaignVisibility !== undefined
          ? {
              preferredCampaignVisibility:
                donorProfile.preferredCampaignVisibility,
            }
          : {}),
      };

      if (Object.keys(donorProfileFields).length > 0) {
        await tx.donor.update({
          where: { id: donorId },
          data: donorProfileFields,
        });
      }

      // Return updated donor with identity and user
      return tx.donor.findUnique({
        where: { id: donorId },
        include: {
          identity: { include: { assets: true } },
          user: {
            omit: { password: true },
          },
        },
      });
    });

    return updatedDonor as DonorResponseDTO;
  }

  remove(id: number) {
    return `This action removes a #${id} donor`;
  }
}
