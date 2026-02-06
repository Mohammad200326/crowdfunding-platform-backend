import { AssetKind } from '@prisma/client';
export declare class CreateDonorIdentityDto {
    fullNameOnId: string;
    idNumber?: string | null;
}
export declare class CreateDonorIdentityFormDto extends CreateDonorIdentityDto {
    idFront: any;
    idBack: any;
    selfieWithId: any;
}
export declare class UpdateDonorIdentityFormDto {
    fullNameOnId?: string;
    idNumber?: string | null;
    idFront?: any;
    idBack?: any;
    selfieWithId?: any;
}
export declare class DonorIdentityAssetDto {
    id: string;
    kind: AssetKind;
    url: string;
    fileType: string;
    fileSizeInKB: number;
    createdAt: Date;
}
export declare class DonorIdentityDto {
    id: string;
    donorId: string;
    fullNameOnId: string;
    idNumber: string | null;
    createdAt: Date;
    updatedAt: Date;
    assets: DonorIdentityAssetDto[];
}
export declare class GetDonorIdentityByDonorResponseDto {
    donorIdentity: DonorIdentityDto;
}
