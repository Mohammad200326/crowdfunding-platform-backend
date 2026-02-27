import { AssetKind } from '@prisma/client';
export declare class CreateCreatorIdentityDto {
    fullNameOnId: string;
    idNumber?: string | null;
}
export declare class CreateCreatorIdentityFormDto extends CreateCreatorIdentityDto {
    idFront: any;
    idBack: any;
    selfieWithId: any;
}
export declare class UpdateCreatorIdentityFormDto {
    fullNameOnId?: string;
    idNumber?: string | null;
    idFront?: any;
    idBack?: any;
    selfieWithId?: any;
}
export declare class CreatorIdentityAssetDto {
    id: string;
    kind: AssetKind;
    url: string;
    fileType: string;
    fileSizeInKB: number;
    createdAt: Date;
}
export declare class CreatorIdentityDto {
    id: string;
    creatorId: string;
    fullNameOnId: string;
    idNumber: string | null;
    createdAt: Date;
    updatedAt: Date;
    assets: CreatorIdentityAssetDto[];
}
export declare class GetCreatorIdentityByCreatorResponseDto {
    creatorIdentity: CreatorIdentityDto;
}
