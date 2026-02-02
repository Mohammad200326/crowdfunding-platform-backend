import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { DonorIdentityService } from './donor-identity.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import {
  CreateDonorIdentitySchema,
  UpdateDonorIdentitySchema,
} from './dto/donor-identity.dto';
import type {
  CreateDonorIdentityDTO,
  DonorIdentityUpdateFiles,
  UpdateDonorIdentityDTO,
  UpdateDonorIdentityResponse,
} from './dto/donor-identity.dto';
import {
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import {
  CreateDonorIdentityFormDto,
  GetDonorIdentityByDonorResponseDto,
  UpdateDonorIdentityFormDto,
} from './dto/donor-identity.swagger.dto';
import { IsPublic } from 'src/utils/decorators/public.decorator';
import { User } from 'src/utils/decorators/user.decorator';
import { UserResponseDTO } from '../auth/dto/auth.dto';

@ApiTags('Donor Identity')
@ApiBearerAuth('access-token')
@Controller('donor-identity')
@IsPublic(true)
export class DonorIdentityController {
  constructor(private readonly donorIdentityService: DonorIdentityService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateDonorIdentityFormDto })
  @ApiCreatedResponse({
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Donor identity created successfully',
        },
        donorIdentity: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            donorId: { type: 'string', format: 'uuid' },
            createdAt: { type: 'string', format: 'date-time' },
          },
          required: ['id', 'donorId', 'createdAt'],
        },
      },
      required: ['message', 'donorIdentity'],
    },
  })
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'idFront', maxCount: 1 },
      { name: 'idBack', maxCount: 1 },
      { name: 'selfieWithId', maxCount: 1 },
    ]),
  )
  create(
    @Body(new ZodValidationPipe(CreateDonorIdentitySchema))
    dto: CreateDonorIdentityDTO,
    @User() user: UserResponseDTO['userData'],
    @UploadedFiles()
    files: {
      idFront: Express.Multer.File[];
      idBack: Express.Multer.File[];
      selfieWithId: Express.Multer.File[];
    },
  ) {
    return this.donorIdentityService.create(dto, user, files);
  }

  @Get(':donorId')
  @ApiOkResponse({ type: GetDonorIdentityByDonorResponseDto })
  getByDonorId(@Param('donorId') donorId: string) {
    return this.donorIdentityService.getByDonorId(donorId);
  }

  @Patch(':donorId')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UpdateDonorIdentityFormDto })
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Donor identity updated successfully',
        },
      },
      required: ['message'],
    },
  })
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'idFront', maxCount: 1 },
      { name: 'idBack', maxCount: 1 },
      { name: 'selfieWithId', maxCount: 1 },
    ]),
  )
  update(
    @Param('donorId') donorId: string,
    @Body(new ZodValidationPipe(UpdateDonorIdentitySchema))
    dto: UpdateDonorIdentityDTO,
    @UploadedFiles() files: DonorIdentityUpdateFiles,
  ): Promise<UpdateDonorIdentityResponse> {
    return this.donorIdentityService.updateByDonorId(donorId, dto, files);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.donorIdentityService.remove(id);
  }
}
