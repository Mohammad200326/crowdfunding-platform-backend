import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiConsumes,
  ApiBody,
  ApiParam,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import { BankAccountService } from './bank-account.service';
import {
  CreateBankAccountSchema,
  UpdateBankAccountSchema,
} from './dto/bank-account.dto';
import type {
  CreateBankAccountDto,
  UpdateBankAccountDto,
  BankAccountWithAssetsDto,
  BankAccountWithRelationsDto,
} from './dto/bank-account.dto';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import { User } from 'src/utils/decorators/user.decorator';
import { UserResponseDTO } from '../auth/dto/auth.dto';
import { Roles } from 'src/utils/decorators/roles.decorator';
import { FileCleanupInterceptor } from '../file/cleanup-file.interceptor';

@ApiTags('Bank Accounts')
@ApiBearerAuth('access-token')
@Controller('bank-account')
export class BankAccountController {
  constructor(private readonly bankAccountService: BankAccountService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new bank account' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      required: ['bankName', 'iban'],
      properties: {
        bankName: {
          type: 'string',
          description: 'Name of the bank',
        },
        iban: {
          type: 'string',
          description: 'International Bank Account Number',
        },
        notes: {
          type: 'string',
          description: 'Additional notes',
        },
        proofDocument: {
          type: 'string',
          format: 'binary',
          description: 'Bank account proof document',
        },
      },
    },
  })
  @ApiCreatedResponse({ description: 'Bank account created successfully' })
  @Roles(['CAMPAIGN_CREATOR'])
  @UseInterceptors(FileInterceptor('proofDocument'), FileCleanupInterceptor)
  async create(
    @Body(new ZodValidationPipe(CreateBankAccountSchema))
    createDto: CreateBankAccountDto,
    @User() user: UserResponseDTO['userData'],
    @UploadedFile() proofDocument?: Express.Multer.File,
  ): Promise<BankAccountWithAssetsDto> {
    return this.bankAccountService.create(createDto, user.id, proofDocument);
  }

  @Get('my-accounts')
  @ApiOperation({ summary: 'Get all bank accounts for the current user' })
  @ApiOkResponse({
    description: 'List of bank accounts for the current user',
  })
  @Roles(['CAMPAIGN_CREATOR'])
  async findMyAccounts(
    @User() user: UserResponseDTO['userData'],
  ): Promise<BankAccountWithAssetsDto[]> {
    return this.bankAccountService.findByUserId(user.id);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get all bank accounts for a specific user' })
  @ApiParam({ name: 'userId', type: 'string', format: 'uuid' })
  @ApiOkResponse({ description: 'List of bank accounts for the user' })
  @Roles(['CAMPAIGN_CREATOR'])
  async findByUserId(
    @Param('userId', ParseUUIDPipe) userId: string,
    @User() user: UserResponseDTO['userData'],
  ): Promise<BankAccountWithAssetsDto[]> {
    if (userId !== user.id) {
      throw new ForbiddenException(
        'You are not authorized to view other users bank accounts',
      );
    }
    return this.bankAccountService.findByUserId(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single bank account by ID' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiOkResponse({ description: 'Bank account found' })
  @Roles(['CAMPAIGN_CREATOR'])
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @User() user: UserResponseDTO['userData'],
  ): Promise<BankAccountWithRelationsDto> {
    const bankAccount = await this.bankAccountService.findOne(id, user.id);
    if (!bankAccount) {
      throw new NotFoundException('Bank account not found');
    }
    return bankAccount;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a bank account' })
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        bankName: {
          type: 'string',
          description: 'Name of the bank',
        },
        iban: {
          type: 'string',
          description: 'International Bank Account Number',
        },
        notes: {
          type: 'string',
          description: 'Additional notes',
        },
        isVerified: {
          type: 'boolean',
          description: 'Verification status (admin only)',
        },
        proofDocument: {
          type: 'string',
          format: 'binary',
          description: 'Updated bank account proof document',
        },
      },
    },
  })
  @ApiOkResponse({ description: 'Bank account updated successfully' })
  @Roles(['CAMPAIGN_CREATOR'])
  @UseInterceptors(FileInterceptor('proofDocument'), FileCleanupInterceptor)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ZodValidationPipe(UpdateBankAccountSchema))
    updateDto: UpdateBankAccountDto,
    @User() user: UserResponseDTO['userData'],
    @UploadedFile() proofDocument?: Express.Multer.File,
  ): Promise<BankAccountWithAssetsDto> {
    return this.bankAccountService.update(
      id,
      updateDto,
      user.id,
      proofDocument,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a bank account' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiNoContentResponse({ description: 'Bank account deleted successfully' })
  @Roles(['CAMPAIGN_CREATOR'])
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
    @User() user: UserResponseDTO['userData'],
  ): Promise<void> {
    await this.bankAccountService.remove(id, user.id);
  }

  @Delete(':bankAccountId/asset/:assetId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Delete a specific asset from a bank account',
  })
  @ApiParam({ name: 'bankAccountId', type: 'string', format: 'uuid' })
  @ApiParam({ name: 'assetId', type: 'string', format: 'uuid' })
  @ApiNoContentResponse({ description: 'Asset deleted successfully' })
  @Roles(['CAMPAIGN_CREATOR'])
  async removeAsset(
    @Param('bankAccountId', ParseUUIDPipe) bankAccountId: string,
    @Param('assetId', ParseUUIDPipe) assetId: string,
    @User() user: UserResponseDTO['userData'],
  ): Promise<void> {
    await this.bankAccountService.removeAsset(bankAccountId, assetId, user.id);
  }
}
