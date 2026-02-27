import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AssetKind } from '@prisma/client';

export class CreateCreatorIdentityDto {
  @ApiProperty({ example: 'Ahmed Mahmoud' })
  fullNameOnId!: string;

  @ApiPropertyOptional({ example: 'A123456789', nullable: true })
  idNumber?: string | null;
}

export class CreateCreatorIdentityFormDto extends CreateCreatorIdentityDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  idFront!: any;

  @ApiProperty({ type: 'string', format: 'binary' })
  idBack!: any;

  @ApiProperty({ type: 'string', format: 'binary' })
  selfieWithId!: any;
}

export class UpdateCreatorIdentityFormDto {
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

export class CreatorIdentityAssetDto {
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

export class CreatorIdentityDto {
  @ApiProperty({ format: 'uuid' })
  id!: string;

  @ApiProperty({ format: 'uuid' })
  creatorId!: string;

  @ApiProperty({ example: 'Ahmed Mahmoud Hassan' })
  fullNameOnId!: string;

  @ApiProperty({ example: 'A123456789', nullable: true })
  idNumber!: string | null;

  @ApiProperty({ format: 'date-time' })
  createdAt!: Date;

  @ApiProperty({ format: 'date-time' })
  updatedAt!: Date;

  @ApiProperty({ type: [CreatorIdentityAssetDto] })
  assets!: CreatorIdentityAssetDto[];
}

export class GetCreatorIdentityByCreatorResponseDto {
  @ApiProperty({ type: CreatorIdentityDto })
  creatorIdentity!: CreatorIdentityDto;
}
