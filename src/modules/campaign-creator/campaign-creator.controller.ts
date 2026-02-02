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
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import { CreateCampaignCreatorSchema } from './dto/create-campaign-creator.dto';
import type { CreateCampaignCreatorDto } from './dto/create-campaign-creator.dto';
import type { UpdateCampaignCreatorDto } from './dto/update-campaign-creator.dto';

import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import {
  CreateCampaignCreatorRequestDto,
  CreateCreatorResponseWrapper,
  CampaignCreatorResponseDto,
} from './dto/create-campaign-creator.swagger.dto';

@ApiTags('Campaign Creator')
@ApiBearerAuth('access-token')
@Controller('campaign-creator')
export class CampaignCreatorController {
  constructor(private readonly service: CampaignCreatorService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create a new campaign creator profile for existing user',
  })
  @ApiBody({ type: CreateCampaignCreatorRequestDto })
  @ApiCreatedResponse({
    description: 'Campaign creator profile created successfully',
    type: CreateCreatorResponseWrapper,
  })
  @UsePipes(new ZodValidationPipe(CreateCampaignCreatorSchema))
  create(@Body() dto: CreateCampaignCreatorDto) {
    return this.service.create(dto);
  }

  // ... rest of the file
  @Get()
  @ApiOperation({ summary: 'Get all campaign creators' })
  @ApiOkResponse({
    description: 'List of all campaign creators',
    type: [CampaignCreatorResponseDto],
  })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get campaign creator by ID' })
  @ApiOkResponse({
    description: 'Campaign creator details',
    type: CampaignCreatorResponseDto,
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
