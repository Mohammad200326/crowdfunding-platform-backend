"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampaignCreatorResponseDto = exports.UpdateCampaignCreatorSwaggerDto = exports.CreateInstitutionCreatorDto = exports.CreateIndividualCreatorDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class BaseCreatorDto {
    userId;
    assetIds;
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '550e8400-e29b-41d4-a716-446655440000',
        description: 'User ID (must exist in the system)',
    }),
    __metadata("design:type", String)
], BaseCreatorDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: ['a1b2c3d4-e5f6-7890-abcd-ef1234567890'],
        description: 'Optional uploaded asset/document IDs to link to this creator',
        required: false,
        type: [String],
    }),
    __metadata("design:type", Array)
], BaseCreatorDto.prototype, "assetIds", void 0);
class CreateIndividualCreatorDto extends BaseCreatorDto {
    type;
}
exports.CreateIndividualCreatorDto = CreateIndividualCreatorDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'INDIVIDUAL',
        enum: ['INDIVIDUAL'],
        description: 'Creator type. For INDIVIDUAL, all institution fields are auto-filled from user data.',
    }),
    __metadata("design:type", String)
], CreateIndividualCreatorDto.prototype, "type", void 0);
class CreateInstitutionCreatorDto extends BaseCreatorDto {
    type;
    institutionName;
    institutionCountry;
    institutionType;
    institutionDateOfEstablishment;
    institutionLegalStatus;
    institutionTaxIdentificationNumber;
    institutionRegistrationNumber;
    institutionRepresentativeName;
    institutionRepresentativePosition;
    institutionRepresentativeRegistrationNumber;
    institutionWebsite;
    institutionRepresentativeSocialMedia;
}
exports.CreateInstitutionCreatorDto = CreateInstitutionCreatorDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'INSTITUTION',
        enum: ['INSTITUTION'],
        description: 'Creator type. For INSTITUTION, provide institution details below. All fields are optional - missing fields will be filled with N/A.',
    }),
    __metadata("design:type", String)
], CreateInstitutionCreatorDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Palestine Hope Foundation',
        description: 'Official name of the institution',
        required: false,
    }),
    __metadata("design:type", String)
], CreateInstitutionCreatorDto.prototype, "institutionName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Palestine',
        description: 'Country where the institution is located',
        required: false,
    }),
    __metadata("design:type", String)
], CreateInstitutionCreatorDto.prototype, "institutionCountry", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Non-Profit Organization',
        description: 'Type of institution (NGO, Charity, Foundation, etc.)',
        required: false,
    }),
    __metadata("design:type", String)
], CreateInstitutionCreatorDto.prototype, "institutionType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2020-01-15',
        format: 'date',
        description: 'Institution establishment date (YYYY-MM-DD)',
        required: false,
    }),
    __metadata("design:type", String)
], CreateInstitutionCreatorDto.prototype, "institutionDateOfEstablishment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Registered NGO',
        description: 'Legal status of the institution',
        required: false,
    }),
    __metadata("design:type", String)
], CreateInstitutionCreatorDto.prototype, "institutionLegalStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'TAX-PS-123456',
        description: 'Tax identification number',
        required: false,
    }),
    __metadata("design:type", String)
], CreateInstitutionCreatorDto.prototype, "institutionTaxIdentificationNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'REG-NGO-789012',
        description: 'Official registration number',
        required: false,
    }),
    __metadata("design:type", String)
], CreateInstitutionCreatorDto.prototype, "institutionRegistrationNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Ahmad Hassan',
        description: 'Full name of the institution representative',
        required: false,
    }),
    __metadata("design:type", String)
], CreateInstitutionCreatorDto.prototype, "institutionRepresentativeName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Executive Director',
        description: 'Position/title of the representative',
        required: false,
    }),
    __metadata("design:type", String)
], CreateInstitutionCreatorDto.prototype, "institutionRepresentativePosition", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'ID-555-2020',
        description: "Representative's official ID or registration number",
        required: false,
    }),
    __metadata("design:type", String)
], CreateInstitutionCreatorDto.prototype, "institutionRepresentativeRegistrationNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'https://www.palestinehope.org',
        format: 'uri',
        description: 'Institution website URL (optional, can be empty)',
        required: false,
    }),
    __metadata("design:type", String)
], CreateInstitutionCreatorDto.prototype, "institutionWebsite", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '@ahmadhassan',
        description: "Representative's social media handle",
        required: false,
    }),
    __metadata("design:type", String)
], CreateInstitutionCreatorDto.prototype, "institutionRepresentativeSocialMedia", void 0);
class UpdateCampaignCreatorSwaggerDto {
    institutionName;
    institutionCountry;
    institutionType;
    institutionDateOfEstablishment;
    institutionLegalStatus;
    institutionTaxIdentificationNumber;
    institutionRegistrationNumber;
    institutionRepresentativeName;
    institutionRepresentativePosition;
    institutionRepresentativeRegistrationNumber;
    institutionWebsite;
    institutionRepresentativeSocialMedia;
}
exports.UpdateCampaignCreatorSwaggerDto = UpdateCampaignCreatorSwaggerDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Palestine Hope Foundation Updated',
        description: 'Institution name',
        required: false,
    }),
    __metadata("design:type", String)
], UpdateCampaignCreatorSwaggerDto.prototype, "institutionName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Palestine',
        description: 'Country',
        required: false,
    }),
    __metadata("design:type", String)
], UpdateCampaignCreatorSwaggerDto.prototype, "institutionCountry", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Non-Profit Organization',
        description: 'Institution type',
        required: false,
    }),
    __metadata("design:type", String)
], UpdateCampaignCreatorSwaggerDto.prototype, "institutionType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2020-01-15',
        description: 'Date of establishment (YYYY-MM-DD)',
        required: false,
    }),
    __metadata("design:type", String)
], UpdateCampaignCreatorSwaggerDto.prototype, "institutionDateOfEstablishment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Registered NGO',
        description: 'Legal status',
        required: false,
    }),
    __metadata("design:type", String)
], UpdateCampaignCreatorSwaggerDto.prototype, "institutionLegalStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'TAX-PS-123456',
        description: 'Tax identification number',
        required: false,
    }),
    __metadata("design:type", String)
], UpdateCampaignCreatorSwaggerDto.prototype, "institutionTaxIdentificationNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'REG-NGO-789012',
        description: 'Registration number',
        required: false,
    }),
    __metadata("design:type", String)
], UpdateCampaignCreatorSwaggerDto.prototype, "institutionRegistrationNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Ahmad Hassan',
        description: 'Representative name',
        required: false,
    }),
    __metadata("design:type", String)
], UpdateCampaignCreatorSwaggerDto.prototype, "institutionRepresentativeName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Executive Director',
        description: 'Representative position',
        required: false,
    }),
    __metadata("design:type", String)
], UpdateCampaignCreatorSwaggerDto.prototype, "institutionRepresentativePosition", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'ID-555-2020',
        description: 'Representative registration number',
        required: false,
    }),
    __metadata("design:type", String)
], UpdateCampaignCreatorSwaggerDto.prototype, "institutionRepresentativeRegistrationNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'https://www.palestinehope.org',
        description: 'Website URL or empty string to clear',
        required: false,
    }),
    __metadata("design:type", String)
], UpdateCampaignCreatorSwaggerDto.prototype, "institutionWebsite", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '@ahmadhassan',
        description: 'Social media handle',
        required: false,
    }),
    __metadata("design:type", String)
], UpdateCampaignCreatorSwaggerDto.prototype, "institutionRepresentativeSocialMedia", void 0);
class CampaignCreatorResponseDto {
    id;
    userId;
    type;
    institutionName;
    institutionCountry;
    institutionType;
    institutionDateOfEstablishment;
    institutionLegalStatus;
    institutionTaxIdentificationNumber;
    institutionRegistrationNumber;
    institutionRepresentativeName;
    institutionRepresentativePosition;
    institutionRepresentativeRegistrationNumber;
    institutionWebsite;
    institutionRepresentativeSocialMedia;
    createdAt;
    updatedAt;
}
exports.CampaignCreatorResponseDto = CampaignCreatorResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '44ed15dc-60b4-4342-b3d6-093818563446' }),
    __metadata("design:type", String)
], CampaignCreatorResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1970c273-360d-4080-86fb-29eb8bf66c9b' }),
    __metadata("design:type", String)
], CampaignCreatorResponseDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ['INDIVIDUAL', 'INSTITUTION'], example: 'INSTITUTION' }),
    __metadata("design:type", String)
], CampaignCreatorResponseDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Palestine Hope Foundation' }),
    __metadata("design:type", String)
], CampaignCreatorResponseDto.prototype, "institutionName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Palestine' }),
    __metadata("design:type", String)
], CampaignCreatorResponseDto.prototype, "institutionCountry", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Non-Profit Organization' }),
    __metadata("design:type", String)
], CampaignCreatorResponseDto.prototype, "institutionType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2020-01-15T00:00:00.000Z' }),
    __metadata("design:type", Date)
], CampaignCreatorResponseDto.prototype, "institutionDateOfEstablishment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Registered NGO' }),
    __metadata("design:type", String)
], CampaignCreatorResponseDto.prototype, "institutionLegalStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'TAX-PS-123456' }),
    __metadata("design:type", String)
], CampaignCreatorResponseDto.prototype, "institutionTaxIdentificationNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'REG-NGO-789012' }),
    __metadata("design:type", String)
], CampaignCreatorResponseDto.prototype, "institutionRegistrationNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Ahmad Hassan' }),
    __metadata("design:type", String)
], CampaignCreatorResponseDto.prototype, "institutionRepresentativeName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Executive Director' }),
    __metadata("design:type", String)
], CampaignCreatorResponseDto.prototype, "institutionRepresentativePosition", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'ID-555-2020' }),
    __metadata("design:type", String)
], CampaignCreatorResponseDto.prototype, "institutionRepresentativeRegistrationNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://www.palestinehope.org' }),
    __metadata("design:type", String)
], CampaignCreatorResponseDto.prototype, "institutionWebsite", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '@ahmadhassan' }),
    __metadata("design:type", String)
], CampaignCreatorResponseDto.prototype, "institutionRepresentativeSocialMedia", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-02-11T15:45:16.307Z' }),
    __metadata("design:type", Date)
], CampaignCreatorResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-02-15T13:08:34.343Z' }),
    __metadata("design:type", Date)
], CampaignCreatorResponseDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=create-campaign-creator.swagger.dto.js.map