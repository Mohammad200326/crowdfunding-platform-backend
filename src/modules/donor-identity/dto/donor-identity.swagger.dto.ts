import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

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
