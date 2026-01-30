import { Injectable } from '@nestjs/common';
import { CreateDonorDto } from './dto/create-donor.dto';
import { UpdateDonorDto } from './dto/update-donor.dto';
import { PaginatedResult, PaginationQueryType } from 'src/types/util.types';
import { Donor, User } from '@prisma/client';
import { removeFields } from 'src/utils/object.util';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class DonorService {
  constructor(private readonly prismaService: DatabaseService) {}

  create(createDonorDto: CreateDonorDto) {
    return 'This action adds a new donor';
  }

  findAll(
    query: PaginationQueryType,
  ): Promise<PaginatedResult<Omit<User, 'password'>>> {
    return this.prismaService.$transaction(async (prisma) => {
      const pagination = this.prismaService.handleQueryPagination(query);
      const donors = await prisma.user.findMany({
        where: { role: 'DONOR' },
        ...removeFields(pagination, ['page']),
        omit: {
          password: true,
        },
        include: { donorProfile: true },
      });

      const count = await prisma.user.count({ where: { role: 'DONOR' } });
      return {
        data: donors,
        ...this.prismaService.formatPaginationResponse({
          page: pagination.page,
          count,
          limit: pagination.take,
        }),
      };
    });
  }

  findOne(id: string) {
    return this.prismaService.user.findUnique({
      where: { id },
      omit: { password: true },
      include: { donorProfile: true },
    });
  }

  update(id: number, updateDonorDto: UpdateDonorDto) {
    return `This action updates a #${id} donor`;
  }

  remove(id: number) {
    return `This action removes a #${id} donor`;
  }
}
