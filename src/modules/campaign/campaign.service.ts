import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { CreateCampaignDto, UpdateCampaignDto } from './dto/campaign.dto';
import {
  Prisma,
  CampaignCategory,
  PaymentStatus,
  PrismaClient,
} from '@prisma/client';
import { DatabaseService } from '../database/database.service';
import { FileService } from '../file/file.service';
import { UserResponseDTO } from '../auth/dto/auth.dto';

@Injectable()
export class CampaignService {
  constructor(
    private readonly filesService: FileService,
    private readonly prismaService: DatabaseService,
  ) {}

  private readonly campaignIncludes = {
    creator: {
      select: {
        id: true,
        firstName: true,
        lastName: true,
        country: true,
      },
    },
    assets: true,
    _count: { select: { likes: true } },
  };

  private readonly donationsInclude = {
    donations: {
      where: { paymentStatus: PaymentStatus.completed },
      select: { stars: true },
    },
  };

  private enrichCampaign<
    T extends { donations: { stars: number }[]; goal: number },
  >(campaign: T) {
    const { donations, ...rest } = campaign;
    return {
      ...rest,
      raisedStars: donations.reduce((sum, d) => sum + d.stars, 0),
    };
  }

  // CREATE CAMPAIGN (With File Upload)
  async create(
    createCampaignDto: CreateCampaignDto,
    user: UserResponseDTO['userData'], // Typed correctly
    file?: Express.Multer.File,
  ) {
    const dataPayload: Prisma.CampaignUncheckedCreateInput = {
      ...createCampaignDto,
      creatorId: user.id,
    };

    // Handle File Upload if exists
    if (file) {
      dataPayload.assets = {
        create: this.filesService.createFileAssetData(
          file,
          user.id,
          'CAMPAIGN_THUMBNAIL',
        ),
      };
    }

    const campaign = await this.prismaService.campaign.create({
      data: dataPayload,
      include: { ...this.campaignIncludes, ...this.donationsInclude },
    });

    return this.enrichCampaign(campaign);
  }

  // GET ALL ACTIVE CAMPAIGNS (Feed + Pagination)
  async findAll(page: number, limit: number) {
    const skip = (page - 1) * limit;

    const campaigns = await this.prismaService.campaign.findMany({
      where: {
        isDeleted: false,
        isActive: true,
      },
      take: limit,
      skip: skip,
      include: { ...this.campaignIncludes, ...this.donationsInclude },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return campaigns.map((c) => this.enrichCampaign(c));
  }

  // GET BY CATEGORY
  async findByCategory(
    category: CampaignCategory,
    page: number,
    limit: number,
  ) {
    const skip = (page - 1) * limit;

    const campaigns = await this.prismaService.campaign.findMany({
      where: {
        category: category,
        isDeleted: false,
        isActive: true,
      },
      take: limit,
      skip: skip,
      include: { ...this.campaignIncludes, ...this.donationsInclude },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return campaigns.map((c) => this.enrichCampaign(c));
  }

  // GET BY CREATOR (Profile)
  async findByCreator(creatorId: string) {
    const campaigns = await this.prismaService.campaign.findMany({
      where: {
        creatorId: creatorId,
        isDeleted: false,
      },
      include: { ...this.campaignIncludes, ...this.donationsInclude },
      orderBy: { createdAt: 'desc' },
    });

    return campaigns.map((c) => this.enrichCampaign(c));
  }

  // GET ONE (Details Page)
  async findOne(id: string) {
    const campaign = await this.prismaService.campaign.findUnique({
      where: { id },
      include: { ...this.campaignIncludes, ...this.donationsInclude },
    });

    if (!campaign) {
      throw new NotFoundException(`Campaign with ID ${id} not found`);
    }

    return this.enrichCampaign(campaign);
  }

  // TOGGLE LIKE
  async toggleLike(campaignId: string, userId: string) {
    const campaign = await this.prismaService.campaign.findUnique({
      where: { id: campaignId },
      select: { id: true, isDeleted: true },
    });

    if (!campaign || campaign.isDeleted) {
      throw new NotFoundException(`Campaign with ID ${campaignId} not found`);
    }

    const prisma = this.prismaService as unknown as PrismaClient;

    /* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment */
    const existingLike = await prisma.campaignLike.findUnique({
      where: { userId_campaignId: { userId, campaignId } },
    });

    if (existingLike) {
      await prisma.campaignLike.delete({
        where: { userId_campaignId: { userId, campaignId } },
      });
      return { liked: false };
    }

    await prisma.campaignLike.create({
      data: { userId, campaignId },
    });
    /* eslint-enable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment */
    return { liked: true };
  }

  // SOFT DELETE
  async softDelete(id: string) {
    const campaign = await this.prismaService.campaign.findUnique({
      where: { id },
    });

    if (!campaign) {
      throw new NotFoundException(`Campaign with ID ${id} not found`);
    }

    if (campaign.isDeleted) {
      throw new NotFoundException(`Campaign is already deleted`);
    }

    // Soft Delete
    return this.prismaService.campaign.update({
      where: { id },
      data: {
        isDeleted: true,
        isActive: false, // If deleted, it cannot be active
      },
      select: { id: true, isDeleted: true },
    });
  }

  // UPDATE
  async update(
    id: string,
    updateCampaignDto: UpdateCampaignDto,
    user: UserResponseDTO['userData'],
    file?: Express.Multer.File,
  ) {
    // Check if campaign exists
    const campaign = await this.prismaService.campaign.findUnique({
      where: { id },
    });

    if (!campaign) {
      throw new NotFoundException(`Campaign with ID ${id} not found`);
    }

    if (campaign.isDeleted) {
      throw new NotFoundException(`Campaign is deleted and cannot be updated`);
    }

    // Check if user is the owner of the campaign
    if (campaign.creatorId !== user.id) {
      throw new ForbiddenException(
        `You are not authorized to update this campaign`,
      );
    }

    // Build update payload
    const dataPayload: Prisma.CampaignUncheckedUpdateInput = {
      ...updateCampaignDto,
    };

    // Handle File Upload if exists (update thumbnail)
    if (file) {
      // Get old campaign thumbnails
      const oldThumbnails = await this.prismaService.asset.findMany({
        where: {
          campaignId: id,
          kind: 'CAMPAIGN_THUMBNAIL',
        },
      });

      // Delete old thumbnails from ImageKit and database
      if (oldThumbnails.length > 0) {
        // Delete from ImageKit
        await Promise.all(
          oldThumbnails.map((asset) =>
            this.filesService.deleteFileFromImageKit(asset.fileId),
          ),
        );

        // Delete from database
        await this.prismaService.asset.deleteMany({
          where: {
            campaignId: id,
            kind: 'CAMPAIGN_THUMBNAIL',
          },
        });
      }

      // Add new thumbnail
      dataPayload.assets = {
        create: this.filesService.createFileAssetData(
          file,
          user.id,
          'CAMPAIGN_THUMBNAIL',
        ),
      };
    }

    return this.enrichCampaign(
      await this.prismaService.campaign.update({
        where: { id },
        data: dataPayload,
        include: { ...this.campaignIncludes, ...this.donationsInclude },
      }),
    );
  }
}
