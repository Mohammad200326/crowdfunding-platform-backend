import { Test, TestingModule } from '@nestjs/testing';
import { BankAccountService } from './bank-account.service';
import { DatabaseService } from '../database/database.service';
import { FileService } from '../file/file.service';

describe('BankAccountService', () => {
  let service: BankAccountService;

  const mockDatabaseService = {
    user: {
      findUnique: jest.fn(),
    },
    bankAccount: {
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
      findMany: jest.fn(),
    },
  };

  const mockFileService = {
    createFileAssetData: jest.fn(),
    deleteFileFromImageKit: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BankAccountService,
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

    service = module.get<BankAccountService>(BankAccountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a bank account successfully', async () => {
      const createDto = {
        bankName: 'Test Bank',
        iban: 'GB82WEST12345698765432',
        notes: 'Test notes',
      };
      const userId = 'user-uuid';

      mockDatabaseService.user.findUnique.mockResolvedValue({
        id: userId,
        role: 'CAMPAIGN_CREATOR',
        isDeleted: false,
      });

      mockDatabaseService.bankAccount.create.mockResolvedValue({
        id: 'account-uuid',
        userId,
        ...createDto,
        assets: [],
      });

      mockDatabaseService.bankAccount.findUniqueOrThrow.mockResolvedValue({
        id: 'account-uuid',
        userId,
        ...createDto,
        assets: [],
      });

      const result = await service.create(createDto, userId);

      expect(result).toBeDefined();
      expect(mockDatabaseService.user.findUnique).toHaveBeenCalledWith({
        where: { id: userId },
        select: { id: true, role: true, isDeleted: true },
      });
    });
  });

  describe('findByUserId', () => {
    it('should return bank accounts for a user', async () => {
      const userId = 'user-uuid';

      mockDatabaseService.bankAccount.findMany.mockResolvedValue([
        { id: 'account-1', bankName: 'Bank 1', assets: [] },
        { id: 'account-2', bankName: 'Bank 2', assets: [] },
      ]);

      const result = await service.findByUserId(userId);

      expect(result).toHaveLength(2);
      expect(mockDatabaseService.bankAccount.findMany).toHaveBeenCalled();
    });
  });
});
