import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiTags,
  ApiOperation,
  ApiQuery,
} from '@nestjs/swagger';
import { FindAllDonorsResponseDto } from './dto/donors.swagger.dto';
import { DonorFindOneResponseDto } from './dto/donors.swagger.dto';
import { DonorService } from './donor.service';
import { CreateDonorDto } from './dto/create-donor.dto';
import { UpdateDonorDto } from './dto/update-donor.dto';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import { paginationSchema } from '../auth/util/api.util';
import type { PaginationQueryType } from 'src/types/util.types';

@ApiTags('Donor')
@Controller('donor')
export class DonorController {
  constructor(private readonly donorService: DonorService) {}

  @Post()
  create(@Body() createDonorDto: CreateDonorDto) {
    return this.donorService.create(createDonorDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all donors with pagination',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Items per page',
    example: 10,
  })
  @ApiOkResponse({
    description: 'List of donors',
    type: FindAllDonorsResponseDto,
  })
  findAll(
    @Query(new ZodValidationPipe(paginationSchema))
    query: PaginationQueryType,
  ) {
    return this.donorService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get donor by id' })
  @ApiOkResponse({
    description: 'Donor details',
    type: DonorFindOneResponseDto,
  })
  findOne(@Param('id') id: string) {
    return this.donorService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDonorDto: UpdateDonorDto) {
    return this.donorService.update(+id, updateDonorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.donorService.remove(+id);
  }
}
