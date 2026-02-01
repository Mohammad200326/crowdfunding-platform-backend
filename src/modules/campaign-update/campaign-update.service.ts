import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { FileService } from '../file/file.service';
import {
  CreateCampaignUpdateDto,
  UpdateCampaignUpdateDto,
  CampaignUpdateWithAssetsDto,
} from './dto/campaign-update.dto';
import { CampaignUpdate, AssetKind } from '@prisma/client';

@Injectable()
export class CampaignUpdateService {
  constructor(
    private readonly prismaService: DatabaseService,
    private readonly fileService: FileService,
  ) {}

  /**
   * Create a new campaign update
   */
  async create(
    createDto: CreateCampaignUpdateDto,
    userId: string,
    files?: Express.Multer.File[],
  ): Promise<CampaignUpdateWithAssetsDto> {
    // Verify campaign exists and user is the creator
    const campaign = await this.prismaService.campaign.findUnique({
      where: { id: createDto.campaignId },
      select: { id: true, creatorId: true, isDeleted: true },
    });

    if (!campaign || campaign.isDeleted) {
      throw new NotFoundException('Campaign not found');
    }

    if (campaign.creatorId !== userId) {
      throw new ForbiddenException(
        'You are not authorized to create updates for this campaign',
      );
    }

    // Create the campaign update
    const campaignUpdate = await this.prismaService.campaignUpdate.create({
      data: {
        campaignId: createDto.campaignId,
        title: createDto.title,
        description: createDto.description,
      },
      include: {
        assets: true,
      },
    });

    // Handle file uploads if provided
    if (files && files.length > 0) {
      const assetPromises = files.map((file) => {
        const assetData = this.fileService.createFileAssetData(
          file,
          userId,
          AssetKind.CAMPAIGN_UPDATE_MEDIA,
        );

        return this.prismaService.asset.create({
          data: {
            ...assetData,
            campaignUpdateId: campaignUpdate.id,
          },
        });
      });

      await Promise.all(assetPromises);
    }

    // Return the update with fresh assets
    return this.prismaService.campaignUpdate.findUniqueOrThrow({
      where: { id: campaignUpdate.id },
      include: { assets: true },
    });
  }

  /**
   * Get a single campaign update by ID
   */
  async findOne(id: string): Promise<CampaignUpdateWithAssetsDto | null> {
    const update = await this.prismaService.campaignUpdate.findUnique({
      where: { id },
      include: {
        assets: true,
      },
    });

    return update;
  }

  /**
   * Get all campaign updates for a specific campaign
   */
  async findByCampaign(
    campaignId: string,
  ): Promise<CampaignUpdateWithAssetsDto[]> {
    // Verify campaign exists
    const campaign = await this.prismaService.campaign.findUnique({
      where: { id: campaignId },
      select: { id: true, isDeleted: true },
    });

    if (!campaign || campaign.isDeleted) {
      throw new NotFoundException('Campaign not found');
    }

    return this.prismaService.campaignUpdate.findMany({
      where: { campaignId },
      include: {
        assets: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  /**
   * Get all campaign updates (admin/general listing)
   */
  async findAll(): Promise<CampaignUpdateWithAssetsDto[]> {
    return this.prismaService.campaignUpdate.findMany({
      include: {
        assets: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  /**
   * Update a campaign update
   */
  async update(
    id: string,
    updateDto: UpdateCampaignUpdateDto,
    userId: string,
    files?: Express.Multer.File[],
  ): Promise<CampaignUpdateWithAssetsDto> {
    // Check if update exists and get associated campaign
    const existingUpdate = await this.prismaService.campaignUpdate.findUnique({
      where: { id },
      include: {
        campaign: {
          select: { creatorId: true },
        },
      },
    });

    if (!existingUpdate) {
      throw new NotFoundException('Campaign update not found');
    }

    if (existingUpdate.campaign.creatorId !== userId) {
      throw new ForbiddenException(
        'You are not authorized to update this campaign update',
      );
    }

    // Update the campaign update
    await this.prismaService.campaignUpdate.update({
      where: { id },
      data: {
        ...(updateDto.title && { title: updateDto.title }),
        ...(updateDto.description && { description: updateDto.description }),
      },
    });

    // Handle new file uploads if provided
    if (files && files.length > 0) {
      const assetPromises = files.map((file) => {
        const assetData = this.fileService.createFileAssetData(
          file,
          userId,
          AssetKind.CAMPAIGN_UPDATE_MEDIA,
        );

        return this.prismaService.asset.create({
          data: {
            ...assetData,
            campaignUpdateId: id,
          },
        });
      });

      await Promise.all(assetPromises);
    }

    // Return the update with fresh assets
    return this.prismaService.campaignUpdate.findUniqueOrThrow({
      where: { id },
      include: { assets: true },
    });
  }

  /**
   * Delete a campaign update
   */
  async remove(id: string, userId: string): Promise<CampaignUpdate> {
    // Check if update exists and get associated campaign
    const existingUpdate = await this.prismaService.campaignUpdate.findUnique({
      where: { id },
      include: {
        campaign: {
          select: { creatorId: true },
        },
        assets: true,
      },
    });

    if (!existingUpdate) {
      throw new NotFoundException('Campaign update not found');
    }

    if (existingUpdate.campaign.creatorId !== userId) {
      throw new ForbiddenException(
        'You are not authorized to delete this campaign update',
      );
    }

    // Delete associated assets from storage
    if (existingUpdate.assets.length > 0) {
      const deletePromises = existingUpdate.assets.map((asset) =>
        this.fileService.deleteFileFromImageKit(asset.fileId),
      );
      await Promise.all(deletePromises);

      // Delete asset records from database
      await this.prismaService.asset.deleteMany({
        where: { campaignUpdateId: id },
      });
    }

    // Delete the campaign update
    return this.prismaService.campaignUpdate.delete({
      where: { id },
    });
  }

  /**
   * Delete a specific asset from a campaign update
   */
  async removeAsset(
    updateId: string,
    assetId: string,
    userId: string,
  ): Promise<void> {
    // Check if update exists and user owns it
    const existingUpdate = await this.prismaService.campaignUpdate.findUnique({
      where: { id: updateId },
      include: {
        campaign: {
          select: { creatorId: true },
        },
      },
    });

    if (!existingUpdate) {
      throw new NotFoundException('Campaign update not found');
    }

    if (existingUpdate.campaign.creatorId !== userId) {
      throw new ForbiddenException(
        'You are not authorized to modify this campaign update',
      );
    }

    // Find the asset
    const asset = await this.prismaService.asset.findUnique({
      where: { id: assetId },
    });

    if (!asset || asset.campaignUpdateId !== updateId) {
      throw new NotFoundException('Asset not found in this campaign update');
    }

    // Delete from storage and database
    await this.fileService.deleteFileFromImageKit(asset.fileId);
    await this.prismaService.asset.delete({
      where: { id: assetId },
    });
  }
}
