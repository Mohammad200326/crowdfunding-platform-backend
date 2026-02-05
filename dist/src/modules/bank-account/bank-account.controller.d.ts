import { BankAccountService } from './bank-account.service';
import type { CreateBankAccountDto, UpdateBankAccountDto, BankAccountWithAssetsDto, BankAccountWithRelationsDto } from './dto/bank-account.dto';
import { UserResponseDTO } from '../auth/dto/auth.dto';
export declare class BankAccountController {
    private readonly bankAccountService;
    constructor(bankAccountService: BankAccountService);
    create(createDto: CreateBankAccountDto, user: UserResponseDTO['userData'], proofDocument?: Express.Multer.File): Promise<BankAccountWithAssetsDto>;
    findMyAccounts(user: UserResponseDTO['userData']): Promise<BankAccountWithAssetsDto[]>;
    findByUserId(userId: string, user: UserResponseDTO['userData']): Promise<BankAccountWithAssetsDto[]>;
    findOne(id: string, user: UserResponseDTO['userData']): Promise<BankAccountWithRelationsDto>;
    update(id: string, updateDto: UpdateBankAccountDto, user: UserResponseDTO['userData'], proofDocument?: Express.Multer.File): Promise<BankAccountWithAssetsDto>;
    remove(id: string, user: UserResponseDTO['userData']): Promise<void>;
    removeAsset(bankAccountId: string, assetId: string, user: UserResponseDTO['userData']): Promise<void>;
}
