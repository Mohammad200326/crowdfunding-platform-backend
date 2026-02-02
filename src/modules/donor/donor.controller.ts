import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiTags,
  ApiOperation,
  ApiQuery,
  ApiConsumes,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import {
  FindAllDonorsResponseDto,
  DonorFindOneResponseDto,
  UpdateDonorFormDto,
  UpdateDonorResponseDto,
} from './dto/donors.swagger.dto';
import { DonorService } from './donor.service';
import { CreateDonorDto } from './dto/create-donor.dto';
import type { UpdateDonorDTO } from './dto/donor.dto';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import { paginationSchema } from '../auth/util/api.util';
import type { PaginationQueryType } from 'src/types/util.types';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { updateDonorSchema } from './utils/donor.validation.schema';
import type { DonorIdentityUpdateFiles } from '../donor-identity/dto/donor-identity.dto';
import { DonorResponseDTO } from './dto/donor.dto';

@ApiTags('Donor')
@ApiBearerAuth('access-token')
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
  @ApiOperation({ summary: 'Update donor profile, user info, and identity' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UpdateDonorFormDto })
  @ApiOkResponse({
    description: 'Donor updated successfully',
    type: UpdateDonorResponseDto,
  })
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'idFront', maxCount: 1 },
      { name: 'idBack', maxCount: 1 },
      { name: 'selfieWithId', maxCount: 1 },
    ]),
  )
  update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateDonorSchema))
    updateDonorDto: UpdateDonorDTO,
    @UploadedFiles() files: DonorIdentityUpdateFiles,
  ): Promise<DonorResponseDTO> {
    return this.donorService.update(id, updateDonorDto, files);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.donorService.remove(+id);
  }
}
