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
import { CreatorIdentityService } from './creator-identity.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import {
  CreateCreatorIdentitySchema,
  UpdateCreatorIdentitySchema,
} from './dto/creator-identity.dto';
import type {
  CreateCreatorIdentityDTO,
  CreatorIdentityUpdateFiles,
  UpdateCreatorIdentityDTO,
  UpdateCreatorIdentityResponse,
} from './dto/creator-identity.dto';
import {
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import {
  CreateCreatorIdentityFormDto,
  GetCreatorIdentityByCreatorResponseDto,
  UpdateCreatorIdentityFormDto,
} from './dto/creator-identity.swagger.dto';
import { User } from 'src/utils/decorators/user.decorator';
import { UserResponseDTO } from '../auth/dto/auth.dto';

@ApiTags('Creator Identity')
@ApiBearerAuth('access-token')
@Controller('creator-identity')
export class CreatorIdentityController {
  constructor(
    private readonly creatorIdentityService: CreatorIdentityService,
  ) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateCreatorIdentityFormDto })
  @ApiCreatedResponse({
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Creator identity created successfully',
        },
        creatorIdentity: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            creatorId: { type: 'string', format: 'uuid' },
            createdAt: { type: 'string', format: 'date-time' },
          },
          required: ['id', 'creatorId', 'createdAt'],
        },
      },
      required: ['message', 'creatorIdentity'],
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
    @Body(new ZodValidationPipe(CreateCreatorIdentitySchema))
    dto: CreateCreatorIdentityDTO,
    @User() user: UserResponseDTO['userData'],
    @UploadedFiles()
    files: {
      idFront: Express.Multer.File[];
      idBack: Express.Multer.File[];
      selfieWithId: Express.Multer.File[];
    },
  ) {
    return this.creatorIdentityService.create(dto, user, files);
  }

  @Get(':creatorId')
  @ApiOkResponse({ type: GetCreatorIdentityByCreatorResponseDto })
  getByCreatorId(@Param('creatorId') creatorId: string) {
    return this.creatorIdentityService.getByCreatorId(creatorId);
  }

  @Patch(':creatorId')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UpdateCreatorIdentityFormDto })
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Creator identity updated successfully',
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
    @Param('creatorId') creatorId: string,
    @Body(new ZodValidationPipe(UpdateCreatorIdentitySchema))
    dto: UpdateCreatorIdentityDTO,
    @UploadedFiles() files: CreatorIdentityUpdateFiles,
  ): Promise<UpdateCreatorIdentityResponse> {
    return this.creatorIdentityService.updateByCreatorId(creatorId, dto, files);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.creatorIdentityService.remove(id);
  }
}
