import { DonorProfileResponseDto, RegisterDonorUserResponseDto } from 'src/modules/auth/dto/auth.swagger.dto';
export declare class FindAllDonorsResponseDto {
    data: RegisterDonorUserResponseDto[];
}
export declare class UpdateDonorFormDto {
    firstName?: string;
    lastName?: string;
    email?: string;
    dateOfBirth?: string;
    phoneNumber?: string;
    country?: string;
    notes?: string;
    'donorProfile[areasOfInterest]'?: string;
    'donorProfile[preferredCampaignTypes]'?: string;
    'donorProfile[geographicScope]'?: string;
    'donorProfile[targetAudience]'?: string;
    'donorProfile[preferredCampaignSize]'?: number;
    'donorProfile[preferredCampaignVisibility]'?: string;
    fullNameOnId?: string;
    idNumber?: string;
    idFront?: any;
    idBack?: any;
    selfieWithId?: any;
}
export declare class AssetResponseDto {
    id: string;
    storageProviderName: string;
    fileImmutableUrl: string;
    kind: string;
}
export declare class DonorIdentityResponseDto {
    id: string;
    donorId: string;
    fullNameOnId: string;
    idNumber: string | null;
    createdAt: string;
    updatedAt: string;
    assets: AssetResponseDto[];
}
export declare class UserWithoutPasswordDto {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: string;
    role: string;
    country: string;
    phoneNumber: string;
    notes: string;
    isDeleted: boolean;
    isVerified: boolean;
    createdAt: string;
    updatedAt: string;
    verificationStatus: string;
}
export declare class UpdateDonorResponseDto {
    id: string;
    userId: string;
    areasOfInterest: string;
    preferredCampaignTypes: string;
    geographicScope: string;
    targetAudience: string;
    preferredCampaignSize: number;
    preferredCampaignVisibility: string;
    createdAt: string;
    updatedAt: string;
    identity: DonorIdentityResponseDto | null;
    user: UserWithoutPasswordDto;
}
export declare class DonorFindOneResponseDto {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    country: string;
    phoneNumber: string;
    notes: string;
    isDeleted: boolean;
    isVerified: boolean;
    createdAt: string;
    updatedAt: string;
    verificationStatus: string;
    donorProfile: DonorProfileResponseDto;
}
