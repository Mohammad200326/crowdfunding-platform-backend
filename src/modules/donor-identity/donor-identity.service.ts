import { Injectable } from '@nestjs/common';
import { CreateDonorIdentityDto } from './dto/create-donor-identity.dto';
import { UpdateDonorIdentityDto } from './dto/update-donor-identity.dto';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class DonorIdentityService {
  constructor(private databaseService: DatabaseService) {}

  create(createDonorIdentityDto: CreateDonorIdentityDto) {
    return 'This action adds a new donorIdentity';
  }

  // findAll() {
  //   return `This action returns all donorIdentity`;
  // }

  findByUserId(userId: string) {
    return this.databaseService.donorIdentity.findUniqueOrThrow({
      where: {
        id: userId,
      },
    });
  }

  update(id: number, updateDonorIdentityDto: UpdateDonorIdentityDto) {
    return `This action updates a #${id} donorIdentity`;
  }

  remove(userId: string) {
    return this.databaseService.donorIdentity.delete({
      where: {
        id: userId,
      },
    });
  }
}
