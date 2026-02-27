import { Test, TestingModule } from '@nestjs/testing';
import { BankAccountController } from './bank-account.controller';
import { BankAccountService } from './bank-account.service';
import { UserResponseDTO } from '../auth/dto/auth.dto';

describe('BankAccountController', () => {
  let controller: BankAccountController;

  const mockBankAccountService = {
    create: jest.fn(),
    findOne: jest.fn(),
    findByUserId: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    removeAsset: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BankAccountController],
      providers: [
        {
          provide: BankAccountService,
          useValue: mockBankAccountService,
        },
      ],
    }).compile();

    controller = module.get<BankAccountController>(BankAccountController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findMyAccounts', () => {
    it('should return an array of bank accounts', async () => {
      const mockAccounts = [
        { id: '1', bankName: 'Bank 1', assets: [] },
        { id: '2', bankName: 'Bank 2', assets: [] },
      ];

      mockBankAccountService.findByUserId.mockResolvedValue(mockAccounts);

      const user: UserResponseDTO['userData'] = {
        id: 'user-uuid',
      } as UserResponseDTO['userData'];
      const result = await controller.findMyAccounts(user);

      expect(result).toEqual(mockAccounts);
      expect(mockBankAccountService.findByUserId).toHaveBeenCalledWith(
        'user-uuid',
      );
    });
  });

  describe('findOne', () => {
    it('should return a single bank account', async () => {
      const mockAccount = {
        id: '1',
        bankName: 'Bank 1',
        assets: [],
      };

      mockBankAccountService.findOne.mockResolvedValue(mockAccount);

      const user: UserResponseDTO['userData'] = {
        id: 'user-uuid',
      } as UserResponseDTO['userData'];
      const result = await controller.findOne('1', user);

      expect(result).toEqual(mockAccount);
    });
  });
});
