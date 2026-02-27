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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampaignCreatorController = void 0;
const common_1 = require("@nestjs/common");
const campaign_creator_service_1 = require("./campaign-creator.service");
const zod_validation_pipe_1 = require("../../pipes/zod-validation.pipe");
const update_campaign_creator_dto_1 = require("./dto/update-campaign-creator.dto");
const swagger_1 = require("@nestjs/swagger");
const create_campaign_creator_swagger_dto_1 = require("./dto/create-campaign-creator.swagger.dto");
let CampaignCreatorController = class CampaignCreatorController {
    service;
    constructor(service) {
        this.service = service;
    }
    findAll(page, limit, type) {
        return this.service.findAll(Number(page) || 1, Number(limit) || 10, type);
    }
    findOne(id) {
        return this.service.findOne(id);
    }
    findByUserId(userId) {
        return this.service.findByUserId(userId);
    }
    update(id, dto) {
        return this.service.update(id, dto);
    }
    remove(id) {
        return this.service.remove(id);
    }
};
exports.CampaignCreatorController = CampaignCreatorController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all creators',
        description: 'Returns paginated list of all active campaign creators with optional type filter',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'page',
        required: false,
        type: Number,
        example: 1,
        description: 'Page number (default: 1)',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'limit',
        required: false,
        type: Number,
        example: 10,
        description: 'Items per page (default: 10)',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'type',
        required: false,
        enum: ['INDIVIDUAL', 'INSTITUTION'],
        description: 'Filter by creator type (INDIVIDUAL OR INSTITUTION)',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'List of creators with pagination',
        schema: {
            example: {
                data: [
                    {
                        id: '44ed15dc-60b4-4342-b3d6-093818563446',
                        type: 'INSTITUTION',
                        userId: '1970c273-360d-4080-86fb-29eb8bf66c9b',
                        institutionName: 'Palestine Hope Foundation',
                        institutionCountry: 'Palestine',
                        createdAt: '2026-02-11T15:45:16.307Z',
                        updatedAt: '2026-02-15T13:08:34.343Z',
                    },
                ],
                meta: {
                    total: 45,
                    page: 1,
                    limit: 10,
                    totalPages: 5,
                },
            },
        },
    }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", void 0)
], CampaignCreatorController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get creator by ID' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Campaign creator UUID',
        example: '44ed15dc-60b4-4342-b3d6-093818563446',
    }),
    (0, swagger_1.ApiOkResponse)({ type: create_campaign_creator_swagger_dto_1.CampaignCreatorResponseDto }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Creator not found or deactivated' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CampaignCreatorController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('user/:userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get creator by user ID' }),
    (0, swagger_1.ApiParam)({
        name: 'userId',
        description: 'User UUID',
        example: '1970c273-360d-4080-86fb-29eb8bf66c9b',
    }),
    (0, swagger_1.ApiOkResponse)({ type: create_campaign_creator_swagger_dto_1.CampaignCreatorResponseDto }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Creator not found or deactivated' }),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CampaignCreatorController.prototype, "findByUserId", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Update creator profile',
        description: 'Update any institution field. All fields are optional.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Campaign creator UUID',
        example: '44ed15dc-60b4-4342-b3d6-093818563446',
    }),
    (0, swagger_1.ApiBody)({
        type: create_campaign_creator_swagger_dto_1.UpdateCampaignCreatorSwaggerDto,
        description: 'Fields to update (all optional, send only what needs to change)',
    }),
    (0, swagger_1.ApiOkResponse)({ type: create_campaign_creator_swagger_dto_1.CampaignCreatorResponseDto }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Creator not found or deactivated' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid input data' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)(new zod_validation_pipe_1.ZodValidationPipe(update_campaign_creator_dto_1.UpdateCampaignCreatorSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], CampaignCreatorController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Deactivate creator account',
        description: 'Deactivates the creator account. ' +
            'Cannot deactivate if creator has active campaigns.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Campaign creator UUID',
        example: '44ed15dc-60b4-4342-b3d6-093818563446',
    }),
    (0, swagger_1.ApiOkResponse)({
        schema: {
            example: {
                message: 'Creator account deactivated successfully',
            },
        },
    }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Creator not found' }),
    (0, swagger_1.ApiConflictResponse)({
        description: 'Cannot deactivate creator with active campaigns',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CampaignCreatorController.prototype, "remove", null);
exports.CampaignCreatorController = CampaignCreatorController = __decorate([
    (0, swagger_1.ApiTags)('Campaign Creator'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiExtraModels)(create_campaign_creator_swagger_dto_1.CreateIndividualCreatorDto, create_campaign_creator_swagger_dto_1.CreateInstitutionCreatorDto, create_campaign_creator_swagger_dto_1.CampaignCreatorResponseDto),
    (0, common_1.Controller)('campaign-creator'),
    __metadata("design:paramtypes", [campaign_creator_service_1.CampaignCreatorService])
], CampaignCreatorController);
//# sourceMappingURL=campaign-creator.controller.js.map