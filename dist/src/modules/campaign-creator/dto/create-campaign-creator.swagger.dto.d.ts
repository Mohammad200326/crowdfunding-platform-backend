declare class BaseCreatorDto {
    userId: string;
    assetIds?: string[];
}
export declare class CreateIndividualCreatorDto extends BaseCreatorDto {
    type: 'INDIVIDUAL';
}
export declare class CreateInstitutionCreatorDto extends BaseCreatorDto {
    type: 'INSTITUTION';
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
export declare class UpdateCampaignCreatorSwaggerDto {
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
}
export {};
