import { CampaignUpdateService } from './campaign-update.service';
import type { CreateCampaignUpdateDto, UpdateCampaignUpdateDto, CampaignUpdateWithAssetsDto } from './dto/campaign-update.dto';
import { UserResponseDTO } from '../auth/dto/auth.dto';
export declare class CampaignUpdateController {
    private readonly campaignUpdateService;
    constructor(campaignUpdateService: CampaignUpdateService);
    create(createDto: CreateCampaignUpdateDto, user: UserResponseDTO['userData'], files?: Express.Multer.File[]): Promise<CampaignUpdateWithAssetsDto>;
    findAll(): Promise<CampaignUpdateWithAssetsDto[]>;
    findOne(id: string): Promise<CampaignUpdateWithAssetsDto>;
    findByCampaign(campaignId: string): Promise<CampaignUpdateWithAssetsDto[]>;
    update(id: string, updateDto: UpdateCampaignUpdateDto, user: UserResponseDTO['userData'], files?: Express.Multer.File[]): Promise<CampaignUpdateWithAssetsDto>;
    remove(id: string, user: UserResponseDTO['userData']): Promise<void>;
    removeAsset(updateId: string, assetId: string, user: UserResponseDTO['userData']): Promise<void>;
}
