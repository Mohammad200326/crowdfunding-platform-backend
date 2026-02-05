export declare class CreateCampaignCreatorRequestDto {
    userId: string;
    type: 'INDIVIDUAL' | 'INSTITUTION';
    institutionCountry: string;
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
    type: string;
    institutionCountry: string;
    createdAt: string;
}
export declare class CreateCreatorResponseWrapper {
    message: string;
    creator: CampaignCreatorResponseDto;
}
