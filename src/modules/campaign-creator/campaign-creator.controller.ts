import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UsePipes,
} from '@nestjs/common';
import { CampaignCreatorService } from './campaign-creator.service';
import { CreateCampaignCreatorSchema } from './dto/create-campaign-creator.dto';
import type { CreateCampaignCreatorDto } from './dto/create-campaign-creator.dto';
import type { UpdateCampaignCreatorDto } from './dto/update-campaign-creator.dto';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';

@ApiTags('Campaign Creator')
@Controller('campaign-creator')
export class CampaignCreatorController {
  constructor(private readonly service: CampaignCreatorService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create a new campaign creator profile for existing user',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        userId: {
          type: 'string',
          format: 'uuid',
          example: '550e8400-e29b-41d4-a716-446655440000',
        },
        type: {
          type: 'string',
          enum: ['INDIVIDUAL', 'INSTITUTION'],
          example: 'INDIVIDUAL',
        },
        institutionCountry: {
          type: 'string',
          example: 'Palestine',
          description: 'Country of institution or individual',
        },
        institutionType: {
          type: 'string',
          example: 'Non-Profit Organization',
        },
        institutionDateOfEstablishment: {
          type: 'string',
          format: 'date',
          example: '2020-01-15',
        },
        institutionLegalStatus: {
          type: 'string',
          example: 'Registered NGO',
        },
        institutionTaxIdentificationNumber: {
          type: 'string',
          example: 'TAX-123456',
        },
        institutionRegistrationNumber: {
          type: 'string',
          example: 'REG-789012',
        },
        institutionRepresentativeName: {
          type: 'string',
          example: 'name Surname',
        },
        institutionRepresentativePosition: {
          type: 'string',
          example: 'Director',
        },
        institutionRepresentativeRegistrationNumber: {
          type: 'string',
          example: 'ID-555',
        },
        institutionWebsite: {
          type: 'string',
          format: 'uri',
          example: 'https://www.example.org',
        },
        institutionRepresentativeSocialMedia: {
          type: 'string',
          example: '@johndoe',
        },
      },
      required: ['userId', 'type', 'institutionCountry'],
    },
  })
  @ApiCreatedResponse({
    description: 'Campaign creator profile created successfully',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Campaign creator profile created successfully',
        },
        creator: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: '550e8400-e29b-41d4-a716-446655440000',
            },
            userId: {
              type: 'string',
              example: '550e8400-e29b-41d4-a716-446655440000',
            },
            type: {
              type: 'string',
              example: 'INDIVIDUAL',
            },
            institutionCountry: {
              type: 'string',
              example: 'Palestine',
            },
            institutionType: {
              type: 'string',
              example: 'Individual',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              example: '2025-01-25T10:00:00.000Z',
            },
          },
        },
      },
    },
  })
  @UsePipes(new ZodValidationPipe(CreateCampaignCreatorSchema))
  create(@Body() dto: CreateCampaignCreatorDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all campaign creators' })
  @ApiOkResponse({
    description: 'List of all campaign creators',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          userId: { type: 'string' },
          type: { type: 'string' },
          institutionCountry: { type: 'string' },
          institutionType: { type: 'string' },
          createdAt: { type: 'string' },
          user: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              firstName: { type: 'string' },
              lastName: { type: 'string' },
              email: { type: 'string' },
              role: { type: 'string' },
              country: { type: 'string' },
            },
          },
        },
      },
    },
  })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get campaign creator by ID' })
  @ApiOkResponse({
    description: 'Campaign creator details',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        userId: { type: 'string' },
        type: { type: 'string' },
        institutionCountry: { type: 'string' },
        createdAt: { type: 'string' },
        user: {
          type: 'object',
          properties: {
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            email: { type: 'string' },
          },
        },
        assets: { type: 'array', items: { type: 'object' } },
      },
    },
  })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update campaign creator (Not implemented)' })
  update(
    @Param('id') id: string,
    @Body() updateCampaignCreatorDto: UpdateCampaignCreatorDto,
  ) {
    return this.service.update(+id, updateCampaignCreatorDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete campaign creator (Not implemented)' })
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
