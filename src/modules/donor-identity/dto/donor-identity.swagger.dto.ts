import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AssetKind } from '@prisma/client';

export class CreateDonorIdentityDto {
  @ApiProperty({
    format: 'uuid',
    example: '8d2d3e0c-9c74-4c8c-9e44-2d5c7b2e2a11',
  })
  donorId!: string;

  @ApiProperty({ example: 'Ahmed Mahmoud' })
  fullNameOnId!: string;

  @ApiPropertyOptional({ example: 'A123456789', nullable: true })
  idNumber?: string | null;
}

export class CreateDonorIdentityFormDto extends CreateDonorIdentityDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  idFront!: any;

  @ApiProperty({ type: 'string', format: 'binary' })
  idBack!: any;

  @ApiProperty({ type: 'string', format: 'binary' })
  selfieWithId!: any;
}

export class UpdateDonorIdentityFormDto {
  @ApiPropertyOptional({ example: 'Ahmed Mahmoud Hassan' })
  fullNameOnId?: string;

  @ApiPropertyOptional({ example: 'A123456789', nullable: true })
  idNumber?: string | null;

  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  idFront?: any;

  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  idBack?: any;

  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  selfieWithId?: any;
}

export class DonorIdentityAssetDto {
  @ApiProperty({ format: 'uuid' })
  id!: string;

  @ApiProperty({ enum: AssetKind })
  kind!: AssetKind;

  @ApiProperty({
    example: 'https://cdn.example.com/files/id-front.jpg',
  })
  url!: string;

  @ApiProperty({ example: 'image/jpeg' })
  fileType!: string;

  @ApiProperty({ example: 245 })
  fileSizeInKB!: number;

  @ApiProperty({ format: 'date-time' })
  createdAt!: Date;
}

export class DonorIdentityDto {
  @ApiProperty({ format: 'uuid' })
  id!: string;

  @ApiProperty({ format: 'uuid' })
  donorId!: string;

  @ApiProperty({ example: 'Ahmed Mahmoud Hassan' })
  fullNameOnId!: string;

  @ApiProperty({ example: 'A123456789', nullable: true })
  idNumber!: string | null;

  @ApiProperty({ format: 'date-time' })
  createdAt!: Date;

  @ApiProperty({ format: 'date-time' })
  updatedAt!: Date;

  @ApiProperty({ type: [DonorIdentityAssetDto] })
  assets!: DonorIdentityAssetDto[];
}

export class GetDonorIdentityByDonorResponseDto {
  @ApiProperty({ type: DonorIdentityDto })
  donorIdentity!: DonorIdentityDto;
}
