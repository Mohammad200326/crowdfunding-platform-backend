import { ApiProperty } from '@nestjs/swagger';
import {
  DonorProfileResponseDto,
  RegisterDonorUserResponseDto,
} from 'src/modules/auth/dto/auth.swagger.dto';

export class FindAllDonorsResponseDto {
  @ApiProperty({ type: [RegisterDonorUserResponseDto] })
  data!: RegisterDonorUserResponseDto[];
}
export class DonorFindOneResponseDto {
  @ApiProperty({ example: '5078c7d2-530a-40fd-adda-e2a762892ce3' })
  id!: string;

  @ApiProperty({ example: 'Ahmed' })
  firstName!: string;

  @ApiProperty({ example: 'Mahmoud' })
  lastName!: string;

  @ApiProperty({ example: 'ahmesedaaaa.mahmoud@example.com' })
  email!: string;

  @ApiProperty({ example: 'DONOR' })
  role!: string;

  @ApiProperty({ example: 'Palestine' })
  country!: string;

  @ApiProperty({ example: '+970599123456' })
  phoneNumber!: string;

  @ApiProperty({
    example: 'New donor interested in supporting charitable projects',
  })
  notes!: string;

  @ApiProperty({ example: false })
  isDeleted!: boolean;

  @ApiProperty({ example: true })
  isVerified!: boolean;

  @ApiProperty({ example: '2026-01-26T09:29:20.773Z' })
  createdAt!: string;

  @ApiProperty({ example: '2026-01-26T09:29:20.773Z' })
  updatedAt!: string;

  @ApiProperty({ example: 'confirmed' })
  verificationStatus!: string;

  @ApiProperty({ type: DonorProfileResponseDto })
  donorProfile!: DonorProfileResponseDto;
}
