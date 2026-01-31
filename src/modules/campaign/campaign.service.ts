import { Injectable } from '@nestjs/common';
import { CreateCampaignDto, UpdateCampaignDto } from './dto/campaign.dto';
import { Prisma } from '@prisma/client';
import { DatabaseService } from '../database/database.service';
import { FileService } from '../file/file.service';

@Injectable()
export class CampaignService {
  constructor(
    private readonly filesService: FileService,
    private readonly prismaService: DatabaseService,
  ) {}

  create(
    createCampaignDto: CreateCampaignDto,
    user: Express.Request['user'],
    file?: Express.Multer.File,
  ) {
    const dataPayload: Prisma.CampaignUncheckedCreateInput = {
      ...createCampaignDto,
      creatorId: user!.id,
    };
    if (file) {
      dataPayload.assets = {
        create: this.filesService.createFileAssetData(
          file,
          user!.id,
          'CAMPAIGN_THUMBNAIL',
        ),
      };
    }

    return this.prismaService.campaign.create({
      data: dataPayload,
      include: {
        assets: true,
        creator: { omit: { password: true } },
        donations: true,
        updates: true,
      },
    });
  }

  findAll() {
    return `This action returns all campaign`;
  }

  findOne(id: number) {
    return `This action returns a #${id} campaign`;
  }

  update(id: number, updateCampaignDto: UpdateCampaignDto) {
    return `This action updates a #${id} campaign`;
  }

  remove(id: number) {
    return `This action removes a #${id} campaign`;
  }
}
