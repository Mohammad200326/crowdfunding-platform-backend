import { DatabaseService } from '../database/database.service';
import { FileService } from '../file/file.service';
import { CreateBankAccountDto, UpdateBankAccountDto, BankAccountWithAssetsDto, BankAccountWithRelationsDto } from './dto/bank-account.dto';
import { BankAccount } from '@prisma/client';
export declare class BankAccountService {
    private readonly prismaService;
    private readonly fileService;
    constructor(prismaService: DatabaseService, fileService: FileService);
    create(createDto: CreateBankAccountDto, userId: string, proofDocument?: Express.Multer.File): Promise<BankAccountWithAssetsDto>;
    findOne(id: string, userId: string): Promise<BankAccountWithRelationsDto | null>;
    findByUserId(userId: string): Promise<BankAccountWithAssetsDto[]>;
    update(id: string, updateDto: UpdateBankAccountDto, userId: string, proofDocument?: Express.Multer.File): Promise<BankAccountWithAssetsDto>;
    remove(id: string, userId: string): Promise<BankAccount>;
    removeAsset(bankAccountId: string, assetId: string, userId: string): Promise<void>;
}
