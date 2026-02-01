import { Test, TestingModule } from '@nestjs/testing';
import { CampaignUpdateService } from './campaign-update.service';
import { DatabaseService } from '../database/database.service';
import { FileService } from '../file/file.service';

describe('CampaignUpdateService', () => {
  let service: CampaignUpdateService;

  const mockDatabaseService = {
    campaign: {
      findUnique: jest.fn(),
    },
    campaignUpdate: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findUniqueOrThrow: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    asset: {
      create: jest.fn(),
      delete: jest.fn(),
      deleteMany: jest.fn(),
      findUnique: jest.fn(),
    },
  };

  const mockFileService = {
    createFileAssetData: jest.fn(),
    deleteFileFromImageKit: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CampaignUpdateService,
        {
          provide: DatabaseService,
          useValue: mockDatabaseService,
        },
        {
          provide: FileService,
          useValue: mockFileService,
        },
      ],
    }).compile();

    service = module.get<CampaignUpdateService>(CampaignUpdateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a campaign update successfully', async () => {
      const createDto = {
        campaignId: 'campaign-uuid',
        title: 'Test Update',
        description: 'Test Description',
      };
      const userId = 'user-uuid';

      mockDatabaseService.campaign.findUnique.mockResolvedValue({
        id: 'campaign-uuid',
        creatorId: userId,
        isDeleted: false,
      });

      mockDatabaseService.campaignUpdate.create.mockResolvedValue({
        id: 'update-uuid',
        ...createDto,
        assets: [],
      });

      mockDatabaseService.campaignUpdate.findUniqueOrThrow.mockResolvedValue({
        id: 'update-uuid',
        ...createDto,
        assets: [],
      });

      const result = await service.create(createDto, userId);

      expect(result).toBeDefined();
      expect(mockDatabaseService.campaign.findUnique).toHaveBeenCalledWith({
        where: { id: createDto.campaignId },
        select: { id: true, creatorId: true, isDeleted: true },
      });
    });
  });

  describe('findByCampaign', () => {
    it('should return updates for a campaign', async () => {
      const campaignId = 'campaign-uuid';

      mockDatabaseService.campaign.findUnique.mockResolvedValue({
        id: campaignId,
        isDeleted: false,
      });

      mockDatabaseService.campaignUpdate.findMany.mockResolvedValue([
        { id: 'update-1', title: 'Update 1', assets: [] },
        { id: 'update-2', title: 'Update 2', assets: [] },
      ]);

      const result = await service.findByCampaign(campaignId);

      expect(result).toHaveLength(2);
      expect(mockDatabaseService.campaignUpdate.findMany).toHaveBeenCalled();
    });
  });
});
