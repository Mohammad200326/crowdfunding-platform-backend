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
exports.CampaignResponseDto = exports.updateCampaignApiBody = exports.createCampaignApiBody = void 0;
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
exports.createCampaignApiBody = {
    schema: {
        type: 'object',
        properties: {
            title: { type: 'string', minLength: 2, maxLength: 100 },
            description: { type: 'string', minLength: 2, maxLength: 1000 },
            category: {
                type: 'string',
                enum: [
                    'WATER',
                    'HEALTH',
                    'ENVIROMENT',
                    'FOOD',
                    'EDUCATION',
                    'SHELTER',
                    'ANIMALS',
                ],
            },
            goal: { type: 'number', minimum: 1 },
            startDate: { type: 'string', format: 'date-time' },
            endDate: { type: 'string', format: 'date-time' },
            motivationMessage: { type: 'string', minLength: 2, maxLength: 1000 },
            notes: { type: 'string', maxLength: 1000, nullable: true },
            longDescription: { type: 'string', maxLength: 5000, nullable: true },
            file: {
                type: 'string',
                format: 'binary',
                description: 'Campaign image or file (optional)',
            },
        },
        required: [
            'title',
            'description',
            'category',
            'goal',
            'startDate',
            'endDate',
            'motivationMessage',
        ],
    },
};
exports.updateCampaignApiBody = {
    schema: {
        type: 'object',
        properties: {
            title: { type: 'string', minLength: 2, maxLength: 100 },
            description: { type: 'string', minLength: 2, maxLength: 1000 },
            category: {
                type: 'string',
                enum: [
                    'WATER',
                    'HEALTH',
                    'ENVIROMENT',
                    'FOOD',
                    'EDUCATION',
                    'SHELTER',
                    'ANIMALS',
                ],
            },
            goal: { type: 'number', minimum: 1 },
            startDate: { type: 'string', format: 'date-time' },
            endDate: { type: 'string', format: 'date-time' },
            motivationMessage: { type: 'string', minLength: 2, maxLength: 1000 },
            notes: { type: 'string', maxLength: 1000 },
            likes: { type: 'number', minimum: 0 },
            status: {
                type: 'string',
                enum: ['pending', 'confirmed', 'rejected'],
            },
            isVerified: { type: 'boolean' },
            verificationStatus: {
                type: 'string',
                enum: ['pending', 'confirmed', 'rejected'],
            },
            isActive: { type: 'boolean' },
            file: {
                type: 'string',
                format: 'binary',
                description: 'New campaign thumbnail (optional)',
            },
        },
        required: [],
    },
};
class CampaignAssetDto {
    id;
    url;
    kind;
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: '123-uuid' }),
    __metadata("design:type", String)
], CampaignAssetDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://img.url...' }),
    __metadata("design:type", String)
], CampaignAssetDto.prototype, "url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'CAMPAIGN_THUMBNAIL' }),
    __metadata("design:type", String)
], CampaignAssetDto.prototype, "kind", void 0);
class CreatorSummaryDto {
    id;
    firstName;
    lastName;
    country;
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: '550e8400-e29b-41d4-a716-446655440000' }),
    __metadata("design:type", String)
], CreatorSummaryDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Ahmad' }),
    __metadata("design:type", String)
], CreatorSummaryDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Ali' }),
    __metadata("design:type", String)
], CreatorSummaryDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Palestine', required: false }),
    __metadata("design:type", String)
], CreatorSummaryDto.prototype, "country", void 0);
class CampaignResponseDto {
    id;
    title;
    description;
    category;
    goal;
    startDate;
    endDate;
    motivationMessage;
    status;
    isActive;
    likes;
    creator;
    isDeleted;
    createdAt;
    assets;
}
exports.CampaignResponseDto = CampaignResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '550e8400-e29b-41d4-a716-446655440000' }),
    __metadata("design:type", String)
], CampaignResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Clean Water' }),
    __metadata("design:type", String)
], CampaignResponseDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'We need to build a well...' }),
    __metadata("design:type", String)
], CampaignResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: client_1.CampaignCategory, example: client_1.CampaignCategory.WATER }),
    __metadata("design:type", String)
], CampaignResponseDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5000, description: 'Target goal in currency unit' }),
    __metadata("design:type", Number)
], CampaignResponseDto.prototype, "goal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-02-01T00:00:00.000Z' }),
    __metadata("design:type", Date)
], CampaignResponseDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-06-01T00:00:00.000Z' }),
    __metadata("design:type", Date)
], CampaignResponseDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Every drop counts!' }),
    __metadata("design:type", String)
], CampaignResponseDto.prototype, "motivationMessage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: client_1.CampaignStatus, example: client_1.CampaignStatus.pending }),
    __metadata("design:type", String)
], CampaignResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], CampaignResponseDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 100, description: 'Number of likes' }),
    __metadata("design:type", Number)
], CampaignResponseDto.prototype, "likes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: CreatorSummaryDto }),
    __metadata("design:type", CreatorSummaryDto)
], CampaignResponseDto.prototype, "creator", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false }),
    __metadata("design:type", Boolean)
], CampaignResponseDto.prototype, "isDeleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], CampaignResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [CampaignAssetDto] }),
    __metadata("design:type", Array)
], CampaignResponseDto.prototype, "assets", void 0);
//# sourceMappingURL=campaign.swagger.dto.js.map