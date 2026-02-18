import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { CampaignCreatorService } from './campaign-creator.service';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import { UpdateCampaignCreatorSchema } from './dto/update-campaign-creator.dto';
import type { UpdateCampaignCreatorDto } from './dto/update-campaign-creator.dto';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiOkResponse,
  ApiBody,
  ApiExtraModels,
  ApiQuery,
  ApiParam,
  ApiNotFoundResponse,
  ApiConflictResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import {
  CreateIndividualCreatorDto,
  CreateInstitutionCreatorDto,
  CampaignCreatorResponseDto,
  UpdateCampaignCreatorSwaggerDto,
} from './dto/create-campaign-creator.swagger.dto';

@ApiTags('Campaign Creator')
@ApiBearerAuth('access-token')
@ApiExtraModels(
  CreateIndividualCreatorDto,
  CreateInstitutionCreatorDto,
  CampaignCreatorResponseDto,
)
@Controller('campaign-creator')
export class CampaignCreatorController {
  constructor(private readonly service: CampaignCreatorService) {}

  //  POST /campaign-creator
  // @Post()
  // @HttpCode(HttpStatus.CREATED)
  // @ApiOperation({
  //   summary: 'Create creator profile',
  //   description:
  //     'Registers a user as a campaign creator. ' +
  //     'INDIVIDUAL type auto-fills institution fields from user data. ' +
  //     'INSTITUTION type accepts optional institution details (missing fields saved as N/A).',
  // })
  // @ApiBody({
  //   description:
  //     'Use type INDIVIDUAL for personal accounts or INSTITUTION for organizations',
  //   schema: {
  //     oneOf: [
  //       { $ref: getSchemaPath(CreateIndividualCreatorDto) },
  //       { $ref: getSchemaPath(CreateInstitutionCreatorDto) },
  //     ],
  //   },
  // })
  // @ApiCreatedResponse({
  //   description: 'Creator profile created successfully',
  //   type: CampaignCreatorResponseDto,
  // })
  // @ApiBadRequestResponse({ description: 'Invalid input or assets not found' })
  // @ApiConflictResponse({
  //   description: 'Creator profile already exists for this user',
  // })
  // create(
  //   @Body(new ZodValidationPipe(CreateCampaignCreatorSchema))
  //   dto: CreateCampaignCreatorDto,
  // ) {
  //   return this.service.create(dto);
  // }

  //  GET /campaign-creator
  @Get()
  @ApiOperation({
    summary: 'Get all creators',
    description: 'Returns paginated list of all active campaign creators',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    example: 1,
    description: 'Page number (default: 1)',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    example: 10,
    description: 'Items per page (default: 10)',
  })
  @ApiOkResponse({
    description: 'List of creators with pagination',
    schema: {
      example: {
        data: [
          {
            id: '44ed15dc-60b4-4342-b3d6-093818563446',
            type: 'INSTITUTION',
            userId: '1970c273-360d-4080-86fb-29eb8bf66c9b',
            institutionName: 'Palestine Hope Foundation',
            institutionCountry: 'Palestine',
            createdAt: '2026-02-11T15:45:16.307Z',
            updatedAt: '2026-02-15T13:08:34.343Z',
          },
        ],
        meta: {
          total: 45,
          page: 1,
          limit: 10,
          totalPages: 5,
        },
      },
    },
  })
  findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.service.findAll(Number(page) || 1, Number(limit) || 10);
  }

  //  GET /campaign-creator/:id
  @Get(':id')
  @ApiOperation({ summary: 'Get creator by ID' })
  @ApiParam({
    name: 'id',
    description: 'Campaign creator UUID',
    example: '44ed15dc-60b4-4342-b3d6-093818563446',
  })
  @ApiOkResponse({ type: CampaignCreatorResponseDto })
  @ApiNotFoundResponse({ description: 'Creator not found or deactivated' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  //  GET /campaign-creator/user/:userId
  @Get('user/:userId')
  @ApiOperation({ summary: 'Get creator by user ID' })
  @ApiParam({
    name: 'userId',
    description: 'User UUID',
    example: '1970c273-360d-4080-86fb-29eb8bf66c9b',
  })
  @ApiOkResponse({ type: CampaignCreatorResponseDto })
  @ApiNotFoundResponse({ description: 'Creator not found or deactivated' })
  findByUserId(@Param('userId') userId: string) {
    return this.service.findByUserId(userId);
  }

  //  PATCH /campaign-creator/:id
  @Patch(':id')
  @ApiOperation({
    summary: 'Update creator profile',
    description: 'Update any institution field. All fields are optional.',
  })
  @ApiParam({
    name: 'id',
    description: 'Campaign creator UUID',
    example: '44ed15dc-60b4-4342-b3d6-093818563446',
  })
  @ApiBody({
    type: UpdateCampaignCreatorSwaggerDto,
    description:
      'Fields to update (all optional, send only what needs to change)',
  })
  @ApiOkResponse({ type: CampaignCreatorResponseDto })
  @ApiNotFoundResponse({ description: 'Creator not found or deactivated' })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(UpdateCampaignCreatorSchema))
    dto: UpdateCampaignCreatorDto,
  ) {
    return this.service.update(id, dto);
  }

  //  DELETE /campaign-creator/:id
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Deactivate creator account',
    description:
      'Deactivates the creator account. ' +
      'Cannot deactivate if creator has active campaigns.',
  })
  @ApiParam({
    name: 'id',
    description: 'Campaign creator UUID',
    example: '44ed15dc-60b4-4342-b3d6-093818563446',
  })
  @ApiOkResponse({
    schema: {
      example: {
        message: 'Creator account deactivated successfully',
      },
    },
  })
  @ApiNotFoundResponse({ description: 'Creator not found' })
  @ApiConflictResponse({
    description: 'Cannot deactivate creator with active campaigns',
  })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
