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
  Query,
} from '@nestjs/common';
import { CampaignCreatorService } from './campaign-creator.service';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import { CreateCampaignCreatorSchema } from './dto/create-campaign-creator.dto';
import { UpdateCampaignCreatorSchema } from './dto/update-campaign-creator.dto';
import type { CreateCampaignCreatorDto } from './dto/create-campaign-creator.dto';
import type { UpdateCampaignCreatorDto } from './dto/update-campaign-creator.dto';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBody,
  ApiExtraModels,
  getSchemaPath,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';
import {
  CreateIndividualCreatorDto,
  CreateInstitutionCreatorDto,
  CampaignCreatorResponseDto,
  UpdateCampaignCreatorSwaggerDto,
} from './dto/create-campaign-creator.swagger.dto';

@ApiTags('Campaign Creator')
@ApiBearerAuth('access-token')
@Controller('campaign-creator')
export class CampaignCreatorController {
  constructor(private readonly service: CampaignCreatorService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create creator profile' })
  @ApiExtraModels(CreateIndividualCreatorDto, CreateInstitutionCreatorDto)
  @ApiBody({
    schema: {
      oneOf: [
        { $ref: getSchemaPath(CreateIndividualCreatorDto) },
        { $ref: getSchemaPath(CreateInstitutionCreatorDto) },
      ],
    },
  })
  @ApiCreatedResponse({ type: CampaignCreatorResponseDto })
  create(
    @Body(new ZodValidationPipe(CreateCampaignCreatorSchema))
    dto: CreateCampaignCreatorDto,
  ) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all creators' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiOkResponse({ type: [CampaignCreatorResponseDto] })
  findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.service.findAll(Number(page) || 1, Number(limit) || 10);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get creator details' })
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ type: CampaignCreatorResponseDto })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update creator profile' })
  @ApiParam({ name: 'id' })
  @ApiBody({ type: UpdateCampaignCreatorSwaggerDto })
  @ApiOkResponse({ type: CampaignCreatorResponseDto })
  update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(UpdateCampaignCreatorSchema))
    dto: UpdateCampaignCreatorDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Deactivate creator account' })
  @ApiParam({ name: 'id' })
  @ApiOkResponse({
    schema: {
      properties: {
        message: { type: 'string' },
      },
    },
  })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
