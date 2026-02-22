import { CreatorType, UserRole, VerificationStatus } from '@prisma/client';
export declare class DonorProfileDto {
    areasOfInterest: string;
    preferredCampaignTypes: string;
    geographicScope: string;
    targetAudience: string;
    preferredCampaignSize: number;
    preferredCampaignVisibility: string;
}
export declare class RegisterDonorDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    dateOfBirth: string;
    phoneNumber?: string;
    country?: string;
    notes?: string;
    donorProfile?: DonorProfileDto;
}
export declare class DonorProfileResponseDto {
    id: string;
    userId: string;
    dateOfBirth: string;
    areasOfInterest: string;
    preferredCampaignTypes: string;
    geographicScope: string;
    targetAudience: string;
    preferredCampaignSize: number;
    preferredCampaignVisibility: string;
    createdAt: string;
    updatedAt: string;
}
export declare class RegisterDonorUserResponseDto {
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
export declare class RegisterDonorResponseDto {
    user: RegisterDonorUserResponseDto;
    token: string;
}
export declare class ForgotPasswordDto {
    email: string;
}
export declare class VerifyForgotOtpDto {
    email: string;
    otp: string;
}
export declare class ResetPasswordDto {
    resetToken: string;
    password: string;
}
export declare class ExpiresInResponseDto {
    expiresIn: number;
}
export declare class LoginRequestDto {
    email: string;
    password: string;
}
export declare class LoginUserDto {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: UserRole;
    country: string;
}
export declare class LoginResponseDto {
    user: LoginUserDto;
    token: string;
}
export declare class CampaignCreatorProfileDto {
    institutionName?: string | null;
    institutionType?: string | null;
    institutionCountry?: string | null;
    institutionDateOfEstablishment?: string | null;
    institutionLegalStatus?: string | null;
    institutionTaxIdentificationNumber?: string | null;
    institutionRegistrationNumber?: string | null;
    institutionRepresentativeName?: string | null;
    institutionRepresentativePosition?: string | null;
    institutionRepresentativeRegistrationNumber?: string | null;
    institutionWebsite?: string | null;
    institutionRepresentativeSocialMedia?: string | null;
}
export declare class RegisterCampaignCreatorDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber?: string | null;
    country?: string | null;
    notes?: string | null;
    dateOfBirth?: string | null;
    type: CreatorType;
    assetIds?: string[];
    institutionDocuments?: InstitutionDocumentsDto | null;
    creatorProfile?: CampaignCreatorProfileDto | null;
}
export declare class CampaignCreatorProfileResponseDto {
    id: string;
    type: CreatorType;
    userId: string;
    institutionName?: string | null;
    institutionType?: string | null;
    institutionCountry?: string | null;
    institutionDateOfEstablishment?: string | null;
    institutionLegalStatus?: string | null;
    institutionTaxIdentificationNumber?: string | null;
    institutionRegistrationNumber?: string | null;
    institutionRepresentativeName?: string | null;
    institutionRepresentativePosition?: string | null;
    institutionRepresentativeRegistrationNumber?: string | null;
    institutionWebsite?: string | null;
    institutionRepresentativeSocialMedia?: string | null;
    createdAt: string;
    updatedAt: string;
}
export declare class CampaignCreatorUserDataResponseDto {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: UserRole;
    country?: string | null;
    phoneNumber?: string | null;
    notes?: string | null;
    dateOfBirth?: string | null;
    isDeleted: boolean;
    isVerified: boolean;
    verificationStatus: VerificationStatus;
    createdAt: string;
    updatedAt: string;
    type: CreatorType;
    creatorProfile?: CampaignCreatorProfileResponseDto | null;
}
export declare class RegisterCampaignCreatorResponseDto {
    token: string;
    userData: CampaignCreatorUserDataResponseDto;
}
export declare class InstitutionDocumentsDto {
    registrationCertificateId?: string;
    commercialLicenseId?: string;
    representativeIdPhotoId?: string;
    commissionerImageId?: string;
    authorizationLetterId?: string;
}
export declare class RegisterCampaignCreatorFormDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber?: string;
    country?: string;
    notes?: string;
    dateOfBirth?: string;
    type: CreatorType;
    institutionName?: string;
    institutionType?: string;
    institutionCountry?: string;
    institutionDateOfEstablishment?: string;
    institutionLegalStatus?: string;
    institutionTaxIdentificationNumber?: string;
    institutionRegistrationNumber?: string;
    institutionRepresentativeName?: string;
    institutionRepresentativePosition?: string;
    institutionRepresentativeRegistrationNumber?: string;
    institutionWebsite?: string;
    institutionRepresentativeSocialMedia?: string;
    registrationCertificate?: any;
    commercialLicense?: any;
    representativeIdPhoto?: any;
    commissionerImage?: any;
    authorizationLetter?: any;
    avatar?: any;
}
