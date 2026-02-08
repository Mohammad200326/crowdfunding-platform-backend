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
import * as createCampaignCreatorDto from './dto/create-campaign-creator.dto';
import * as updateCampaignCreatorDto from './dto/update-campaign-creator.dto';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { CampaignCreatorResponseDto } from './dto/create-campaign-creator.swagger.dto';

@ApiTags('Campaign Creator')
@ApiBearerAuth('access-token')
@Controller('campaign-creator')
export class CampaignCreatorController {
  constructor(private readonly service: CampaignCreatorService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new campaign creator profile' })
  @ApiCreatedResponse({
    description: 'Profile created',
    type: CampaignCreatorResponseDto,
  })
  @UsePipes(
    new ZodValidationPipe(createCampaignCreatorDto.CreateCampaignCreatorSchema),
  )
  create(@Body() dto: createCampaignCreatorDto.CreateCampaignCreatorDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all campaign creators' })
  @ApiOkResponse({ type: [CampaignCreatorResponseDto] })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific campaign creator by ID' })
  @ApiOkResponse({ type: CampaignCreatorResponseDto })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update campaign creator details' })
  @UsePipes(
    new ZodValidationPipe(updateCampaignCreatorDto.UpdateCampaignCreatorSchema),
  )
  update(
    @Param('id') id: string,
    @Body() dto: updateCampaignCreatorDto.UpdateCampaignCreatorDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete campaign creator profile' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
