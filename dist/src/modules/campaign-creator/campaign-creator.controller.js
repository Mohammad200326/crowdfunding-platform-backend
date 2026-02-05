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
    findAll() {
        return this.service.findAll();
    }
    findOne(id) {
        return this.service.findOne(id);
    }
    update(id, updateCampaignCreatorDto) {
        return this.service.update(+id, updateCampaignCreatorDto);
    }
    remove(id) {
        return this.service.remove(+id);
    }
};
exports.CampaignCreatorController = CampaignCreatorController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({
        summary: 'Create a new campaign creator profile for existing user',
    }),
    (0, swagger_1.ApiBody)({ type: create_campaign_creator_swagger_dto_1.CreateCampaignCreatorRequestDto }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Campaign creator profile created successfully',
        type: create_campaign_creator_swagger_dto_1.CreateCreatorResponseWrapper,
    }),
    (0, common_1.UsePipes)(new zod_validation_pipe_1.ZodValidationPipe(create_campaign_creator_dto_1.CreateCampaignCreatorSchema)),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CampaignCreatorController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all campaign creators' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'List of all campaign creators',
        type: [create_campaign_creator_swagger_dto_1.CampaignCreatorResponseDto],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CampaignCreatorController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get campaign creator by ID' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Campaign creator details',
        type: create_campaign_creator_swagger_dto_1.CampaignCreatorResponseDto,
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CampaignCreatorController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update campaign creator (Not implemented)' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], CampaignCreatorController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete campaign creator (Not implemented)' }),
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