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
const create_campaign_creator_dto_1 = require("./dto/create-campaign-creator.dto");
const update_campaign_creator_dto_1 = require("./dto/update-campaign-creator.dto");
const swagger_1 = require("@nestjs/swagger");
const create_campaign_creator_swagger_dto_1 = require("./dto/create-campaign-creator.swagger.dto");
let CampaignCreatorController = class CampaignCreatorController {
    service;
    constructor(service) {
        this.service = service;
    }
    create(dto) {
        return this.service.create(dto);
    }
    findAll(page, limit) {
        return this.service.findAll(Number(page) || 1, Number(limit) || 10);
    }
    findOne(id) {
        return this.service.findOne(id);
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
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Create creator profile' }),
    (0, swagger_1.ApiExtraModels)(create_campaign_creator_swagger_dto_1.CreateIndividualCreatorDto, create_campaign_creator_swagger_dto_1.CreateInstitutionCreatorDto),
    (0, swagger_1.ApiBody)({
        schema: {
            oneOf: [
                { $ref: (0, swagger_1.getSchemaPath)(create_campaign_creator_swagger_dto_1.CreateIndividualCreatorDto) },
                { $ref: (0, swagger_1.getSchemaPath)(create_campaign_creator_swagger_dto_1.CreateInstitutionCreatorDto) },
            ],
        },
    }),
    (0, swagger_1.ApiCreatedResponse)({ type: create_campaign_creator_swagger_dto_1.CampaignCreatorResponseDto }),
    __param(0, (0, common_1.Body)(new zod_validation_pipe_1.ZodValidationPipe(create_campaign_creator_dto_1.CreateCampaignCreatorSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CampaignCreatorController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all creators' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, example: 10 }),
    (0, swagger_1.ApiOkResponse)({ type: [create_campaign_creator_swagger_dto_1.CampaignCreatorResponseDto] }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], CampaignCreatorController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get creator details' }),
    (0, swagger_1.ApiParam)({ name: 'id' }),
    (0, swagger_1.ApiOkResponse)({ type: create_campaign_creator_swagger_dto_1.CampaignCreatorResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CampaignCreatorController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update creator profile' }),
    (0, swagger_1.ApiParam)({ name: 'id' }),
    (0, swagger_1.ApiBody)({ type: create_campaign_creator_swagger_dto_1.UpdateCampaignCreatorSwaggerDto }),
    (0, swagger_1.ApiOkResponse)({ type: create_campaign_creator_swagger_dto_1.CampaignCreatorResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)(new zod_validation_pipe_1.ZodValidationPipe(update_campaign_creator_dto_1.UpdateCampaignCreatorSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], CampaignCreatorController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Deactivate creator account' }),
    (0, swagger_1.ApiParam)({ name: 'id' }),
    (0, swagger_1.ApiOkResponse)({
        schema: {
            properties: {
                message: { type: 'string' },
            },
        },
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CampaignCreatorController.prototype, "remove", null);
exports.CampaignCreatorController = CampaignCreatorController = __decorate([
    (0, swagger_1.ApiTags)('Campaign Creator'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Controller)('campaign-creator'),
    __metadata("design:paramtypes", [campaign_creator_service_1.CampaignCreatorService])
], CampaignCreatorController);
//# sourceMappingURL=campaign-creator.controller.js.map