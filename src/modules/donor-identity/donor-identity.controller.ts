import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DonorIdentityService } from './donor-identity.service';
import { CreateDonorIdentityDto } from './dto/create-donor-identity.dto';
import { UpdateDonorIdentityDto } from './dto/update-donor-identity.dto';

@Controller('donor-identity')
export class DonorIdentityController {
  constructor(private readonly donorIdentityService: DonorIdentityService) {}

  @Post()
  create(@Body() createDonorIdentityDto: CreateDonorIdentityDto) {
    return this.donorIdentityService.create(createDonorIdentityDto);
  }

  // @Get()
  // findAll() {
  //   return this.donorIdentityService.findAll();
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.donorIdentityService.findByUserId(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDonorIdentityDto: UpdateDonorIdentityDto) {
    return this.donorIdentityService.update(+id, updateDonorIdentityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.donorIdentityService.remove(id);
  }
}
