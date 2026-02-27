import { Test, TestingModule } from '@nestjs/testing';
import { CampaignUpdateController } from './campaign-update.controller';
import { CampaignUpdateService } from './campaign-update.service';

describe('CampaignUpdateController', () => {
  let controller: CampaignUpdateController;

  const mockCampaignUpdateService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    findByCampaign: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    removeAsset: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CampaignUpdateController],
      providers: [
        {
          provide: CampaignUpdateService,
          useValue: mockCampaignUpdateService,
        },
      ],
    }).compile();

    controller = module.get<CampaignUpdateController>(CampaignUpdateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of campaign updates', async () => {
      const mockUpdates = [
        { id: '1', title: 'Update 1', assets: [] },
        { id: '2', title: 'Update 2', assets: [] },
      ];

      mockCampaignUpdateService.findAll.mockResolvedValue(mockUpdates);

      const result = await controller.findAll();

      expect(result).toEqual(mockUpdates);
      expect(mockCampaignUpdateService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single campaign update', async () => {
      const mockUpdate = { id: '1', title: 'Update 1', assets: [] };

      mockCampaignUpdateService.findOne.mockResolvedValue(mockUpdate);

      const result = await controller.findOne('1');

      expect(result).toEqual(mockUpdate);
    });
  });
});
