import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { FileService } from '../file/file.service';
import {
  CreateBankAccountDto,
  UpdateBankAccountDto,
  BankAccountWithAssetsDto,
  BankAccountWithRelationsDto,
} from './dto/bank-account.dto';
import { BankAccount, AssetKind } from '@prisma/client';

@Injectable()
export class BankAccountService {
  constructor(
    private readonly prismaService: DatabaseService,
    private readonly fileService: FileService,
  ) {}

  /**
   * Create a new bank account for a user
   */
  async create(
    createDto: CreateBankAccountDto,
    userId: string,
    proofDocument?: Express.Multer.File,
  ): Promise<BankAccountWithAssetsDto> {
    // Verify user exists and is a campaign creator
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
      select: { id: true, role: true, isDeleted: true },
    });

    if (!user || user.isDeleted) {
      throw new NotFoundException('User not found');
    }

    if (user.role !== 'CAMPAIGN_CREATOR') {
      throw new ForbiddenException(
        'Only campaign creators can add bank accounts',
      );
    }

    // Create the bank account
    const bankAccount = await this.prismaService.bankAccount.create({
      data: {
        userId,
        bankName: createDto.bankName,
        iban: createDto.iban,
        notes: createDto.notes || '',
      },
      include: {
        assets: true,
      },
    });

    // Handle proof document upload if provided
    if (proofDocument) {
      const assetData = this.fileService.createFileAssetData(
        proofDocument,
        userId,
        AssetKind.BANK_PROOF_DOCUMENT,
      );

      await this.prismaService.asset.create({
        data: {
          ...assetData,
          bankAccountId: bankAccount.id,
        },
      });
    }

    // Return the bank account with fresh assets
    return this.prismaService.bankAccount.findUniqueOrThrow({
      where: { id: bankAccount.id },
      include: { assets: true },
    });
  }

  /**
   * Get a single bank account by ID
   */
  async findOne(
    id: string,
    userId: string,
  ): Promise<BankAccountWithRelationsDto | null> {
    const bankAccount = await this.prismaService.bankAccount.findUnique({
      where: { id },
      include: {
        assets: true,
        withdrawals: true,
        creator: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    if (!bankAccount) {
      return null;
    }

    // Check if user owns this bank account
    if (bankAccount.userId !== userId) {
      throw new ForbiddenException(
        'You are not authorized to access this bank account',
      );
    }

    return bankAccount;
  }

  /**
   * Get all bank accounts for a specific user
   */
  async findByUserId(userId: string): Promise<BankAccountWithAssetsDto[]> {
    return this.prismaService.bankAccount.findMany({
      where: { userId },
      include: {
        assets: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  /**
   * Update a bank account
   */
  async update(
    id: string,
    updateDto: UpdateBankAccountDto,
    userId: string,
    proofDocument?: Express.Multer.File,
  ): Promise<BankAccountWithAssetsDto> {
    // Check if bank account exists and user owns it
    const existingAccount = await this.prismaService.bankAccount.findUnique({
      where: { id },
      select: { id: true, userId: true },
    });

    if (!existingAccount) {
      throw new NotFoundException('Bank account not found');
    }

    if (existingAccount.userId !== userId) {
      throw new ForbiddenException(
        'You are not authorized to update this bank account',
      );
    }

    // Update the bank account
    await this.prismaService.bankAccount.update({
      where: { id },
      data: {
        ...(updateDto.bankName && { bankName: updateDto.bankName }),
        ...(updateDto.iban && { iban: updateDto.iban }),
        ...(updateDto.notes !== undefined && { notes: updateDto.notes }),
        ...(updateDto.isVerified !== undefined && {
          isVerified: updateDto.isVerified,
        }),
      },
    });

    // Handle new proof document upload if provided
    if (proofDocument) {
      // Delete old proof documents
      const oldDocuments = await this.prismaService.asset.findMany({
        where: {
          bankAccountId: id,
          kind: AssetKind.BANK_PROOF_DOCUMENT,
        },
      });

      if (oldDocuments.length > 0) {
        const deletePromises = oldDocuments.map((doc) =>
          this.fileService.deleteFileFromImageKit(doc.fileId),
        );
        await Promise.all(deletePromises);

        await this.prismaService.asset.deleteMany({
          where: {
            bankAccountId: id,
            kind: AssetKind.BANK_PROOF_DOCUMENT,
          },
        });
      }

      // Create new proof document
      const assetData = this.fileService.createFileAssetData(
        proofDocument,
        userId,
        AssetKind.BANK_PROOF_DOCUMENT,
      );

      await this.prismaService.asset.create({
        data: {
          ...assetData,
          bankAccountId: id,
        },
      });
    }

    // Return the updated bank account with fresh assets
    return this.prismaService.bankAccount.findUniqueOrThrow({
      where: { id },
      include: { assets: true },
    });
  }

  /**
   * Delete a bank account (hard delete)
   */
  async remove(id: string, userId: string): Promise<BankAccount> {
    // Check if bank account exists and user owns it
    const existingAccount = await this.prismaService.bankAccount.findUnique({
      where: { id },
      include: {
        assets: true,
        withdrawals: true,
      },
    });

    if (!existingAccount) {
      throw new NotFoundException('Bank account not found');
    }

    if (existingAccount.userId !== userId) {
      throw new ForbiddenException(
        'You are not authorized to delete this bank account',
      );
    }

    // Check if there are associated withdrawals
    if (existingAccount.withdrawals.length > 0) {
      throw new ForbiddenException(
        'Cannot delete bank account with existing withdrawals. Please contact support.',
      );
    }

    // Delete associated assets from storage
    if (existingAccount.assets.length > 0) {
      const deletePromises = existingAccount.assets.map((asset) =>
        this.fileService.deleteFileFromImageKit(asset.fileId),
      );
      await Promise.all(deletePromises);

      // Delete asset records from database
      await this.prismaService.asset.deleteMany({
        where: { bankAccountId: id },
      });
    }

    // Delete the bank account
    return this.prismaService.bankAccount.delete({
      where: { id },
    });
  }

  /**
   * Delete a specific asset (proof document) from a bank account
   */
  async removeAsset(
    bankAccountId: string,
    assetId: string,
    userId: string,
  ): Promise<void> {
    // Check if bank account exists and user owns it
    const existingAccount = await this.prismaService.bankAccount.findUnique({
      where: { id: bankAccountId },
      select: { id: true, userId: true },
    });

    if (!existingAccount) {
      throw new NotFoundException('Bank account not found');
    }

    if (existingAccount.userId !== userId) {
      throw new ForbiddenException(
        'You are not authorized to modify this bank account',
      );
    }

    // Find the asset
    const asset = await this.prismaService.asset.findUnique({
      where: { id: assetId },
    });

    if (!asset || asset.bankAccountId !== bankAccountId) {
      throw new NotFoundException('Asset not found in this bank account');
    }

    // Delete from storage and database
    await this.fileService.deleteFileFromImageKit(asset.fileId);
    await this.prismaService.asset.delete({
      where: { id: assetId },
    });
  }
}
