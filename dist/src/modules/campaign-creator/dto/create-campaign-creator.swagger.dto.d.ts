export declare class CreateCampaignCreatorRequestDto {
    userId: string;
    type: 'INDIVIDUAL' | 'INSTITUTION';
    assetIds?: string[];
    institutionName?: string;
    institutionCountry?: string;
    institutionType?: string;
    institutionDateOfEstablishment?: string;
    institutionLegalStatus?: string;
    institutionTaxIdentificationNumber?: string;
    institutionRegistrationNumber?: string;
    institutionRepresentativeName?: string;
    institutionRepresentativePosition?: string;
    institutionRepresentativeRegistrationNumber?: string;
    institutionWebsite?: string;
    institutionRepresentativeSocialMedia?: string;
}
declare class UserInfo {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    country?: string;
    phoneNumber?: string;
}
declare class AssetInfo {
    id: string;
    url: string;
    fileType: string;
    kind: string;
    createdAt: Date;
}
export declare class CampaignCreatorResponseDto {
    id: string;
    userId: string;
    type: 'INDIVIDUAL' | 'INSTITUTION';
    institutionName: string;
    institutionCountry: string;
    institutionType: string;
    institutionDateOfEstablishment: Date;
    institutionLegalStatus: string;
    institutionTaxIdentificationNumber: string;
    institutionRegistrationNumber: string;
    institutionRepresentativeName: string;
    institutionRepresentativePosition: string;
    institutionRepresentativeRegistrationNumber: string;
    institutionWebsite: string;
    institutionRepresentativeSocialMedia: string;
    createdAt: Date;
    updatedAt: Date;
    user?: UserInfo;
    assets?: AssetInfo[];
}
export declare class CreateCreatorResponseWrapper {
    message: string;
    creator: CampaignCreatorResponseDto;
}
export declare class UpdateCampaignCreatorRequestDto {
    institutionName?: string;
    institutionCountry?: string;
    institutionType?: string;
    institutionDateOfEstablishment?: string;
    institutionLegalStatus?: string;
    institutionTaxIdentificationNumber?: string;
    institutionRegistrationNumber?: string;
    institutionRepresentativeName?: string;
    institutionRepresentativePosition?: string;
    institutionRepresentativeRegistrationNumber?: string;
    institutionWebsite?: string;
    institutionRepresentativeSocialMedia?: string;
}
export {};
