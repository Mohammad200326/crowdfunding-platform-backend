import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { CreateCampaignDto, UpdateCampaignDto } from './dto/campaign.dto';
import { Prisma, CampaignCategory } from '@prisma/client';
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
    assets: true, // Fetch images/thumbnails
  };

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

    return this.prismaService.campaign.create({
      data: dataPayload,
      include: this.campaignIncludes, // Use consistent include
    });
  }

  // GET ALL ACTIVE CAMPAIGNS (Feed + Pagination)
  async findAll(page: number, limit: number) {
    const skip = (page - 1) * limit;

    return this.prismaService.campaign.findMany({
      where: {
        isDeleted: false,
        isActive: true,
      },
      take: limit,
      skip: skip,
      include: this.campaignIncludes,
      orderBy: {
        createdAt: 'desc', // Newest first
      },
    });
  }

  // GET BY CATEGORY
  async findByCategory(
    category: CampaignCategory,
    page: number,
    limit: number,
  ) {
    const skip = (page - 1) * limit;

    return this.prismaService.campaign.findMany({
      where: {
        category: category,
        isDeleted: false,
        isActive: true,
      },
      take: limit,
      skip: skip,
      include: this.campaignIncludes,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  // GET BY CREATOR (Profile)
  async findByCreator(creatorId: string) {
    return this.prismaService.campaign.findMany({
      where: {
        creatorId: creatorId,
        isDeleted: false,
      },
      include: this.campaignIncludes,
      orderBy: { createdAt: 'desc' },
    });
  }

  // GET ONE (Details Page)
  async findOne(id: string) {
    const campaign = await this.prismaService.campaign.findUnique({
      where: { id },
      include: this.campaignIncludes,
    });

    if (!campaign) {
      throw new NotFoundException(`Campaign with ID ${id} not found`);
    }

    return campaign;
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
    user: Express.Request['user'],
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
    if (campaign.creatorId !== user!.id) {
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
          user!.id,
          'CAMPAIGN_THUMBNAIL',
        ),
      };
    }

    return this.prismaService.campaign.update({
      where: { id },
      data: dataPayload,
      include: this.campaignIncludes,
    });
  }
}
