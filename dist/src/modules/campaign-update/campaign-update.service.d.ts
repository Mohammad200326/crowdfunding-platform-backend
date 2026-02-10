import { DatabaseService } from '../database/database.service';
import { FileService } from '../file/file.service';
import { CreateCampaignUpdateDto, UpdateCampaignUpdateDto, CampaignUpdateWithAssetsDto } from './dto/campaign-update.dto';
import { CampaignUpdate } from '@prisma/client';
export declare class CampaignUpdateService {
    private readonly prismaService;
    private readonly fileService;
    constructor(prismaService: DatabaseService, fileService: FileService);
    create(createDto: CreateCampaignUpdateDto, userId: string, files?: Express.Multer.File[]): Promise<CampaignUpdateWithAssetsDto>;
    findOne(id: string): Promise<CampaignUpdateWithAssetsDto | null>;
    findByCampaign(campaignId: string): Promise<CampaignUpdateWithAssetsDto[]>;
    findAll(): Promise<CampaignUpdateWithAssetsDto[]>;
    update(id: string, updateDto: UpdateCampaignUpdateDto, userId: string, files?: Express.Multer.File[]): Promise<CampaignUpdateWithAssetsDto>;
    remove(id: string, userId: string): Promise<CampaignUpdate>;
    removeAsset(updateId: string, assetId: string, userId: string): Promise<void>;
}
