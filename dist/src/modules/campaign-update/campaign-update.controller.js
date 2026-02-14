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
exports.CampaignUpdateController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const campaign_update_service_1 = require("./campaign-update.service");
const campaign_update_dto_1 = require("./dto/campaign-update.dto");
const zod_validation_pipe_1 = require("../../pipes/zod-validation.pipe");
const user_decorator_1 = require("../../utils/decorators/user.decorator");
const roles_decorator_1 = require("../../utils/decorators/roles.decorator");
const cleanup_file_interceptor_1 = require("../file/cleanup-file.interceptor");
let CampaignUpdateController = class CampaignUpdateController {
    campaignUpdateService;
    constructor(campaignUpdateService) {
        this.campaignUpdateService = campaignUpdateService;
    }
    async create(createDto, user, files) {
        return this.campaignUpdateService.create(createDto, user.id, files);
    }
    async findAll() {
        return this.campaignUpdateService.findAll();
    }
    async findOne(id) {
        const update = await this.campaignUpdateService.findOne(id);
        if (!update) {
            throw new common_1.NotFoundException('Campaign update not found');
        }
        return update;
    }
    async findByCampaign(campaignId) {
        return this.campaignUpdateService.findByCampaign(campaignId);
    }
    async update(id, updateDto, user, files) {
        return this.campaignUpdateService.update(id, updateDto, user.id, files);
    }
    async remove(id, user) {
        await this.campaignUpdateService.remove(id, user.id);
    }
    async removeAsset(updateId, assetId, user) {
        await this.campaignUpdateService.removeAsset(updateId, assetId, user.id);
    }
};
exports.CampaignUpdateController = CampaignUpdateController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new campaign update' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            required: ['campaignId', 'title', 'description'],
            properties: {
                campaignId: {
                    type: 'string',
                    format: 'uuid',
                    description: 'Campaign ID',
                },
                title: { type: 'string', description: 'Update title' },
                description: { type: 'string', description: 'Update description' },
                files: {
                    type: 'array',
                    items: { type: 'string', format: 'binary' },
                    description: 'Media files for the update',
                },
            },
        },
    }),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Campaign update created successfully' }),
    (0, roles_decorator_1.Roles)(['CAMPAIGN_CREATOR']),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 10), cleanup_file_interceptor_1.FileCleanupInterceptor),
    __param(0, (0, common_1.Body)(new zod_validation_pipe_1.ZodValidationPipe(campaign_update_dto_1.CreateCampaignUpdateSchema))),
    __param(1, (0, user_decorator_1.User)()),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Array]),
    __metadata("design:returntype", Promise)
], CampaignUpdateController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all campaign updates' }),
    (0, swagger_1.ApiOkResponse)({ description: 'List of all campaign updates' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CampaignUpdateController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a single campaign update by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'string', format: 'uuid' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Campaign update found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CampaignUpdateController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('campaign/:campaignId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all updates for a specific campaign' }),
    (0, swagger_1.ApiParam)({ name: 'campaignId', type: 'string', format: 'uuid' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'List of campaign updates for the specified campaign',
    }),
    __param(0, (0, common_1.Param)('campaignId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CampaignUpdateController.prototype, "findByCampaign", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a campaign update' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'string', format: 'uuid' }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                title: { type: 'string', description: 'Update title' },
                description: { type: 'string', description: 'Update description' },
                files: {
                    type: 'array',
                    items: { type: 'string', format: 'binary' },
                    description: 'Additional media files',
                },
            },
        },
    }),
    (0, swagger_1.ApiOkResponse)({ description: 'Campaign update updated successfully' }),
    (0, roles_decorator_1.Roles)(['CAMPAIGN_CREATOR']),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 10), cleanup_file_interceptor_1.FileCleanupInterceptor),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)(new zod_validation_pipe_1.ZodValidationPipe(campaign_update_dto_1.UpdateCampaignUpdateSchema))),
    __param(2, (0, user_decorator_1.User)()),
    __param(3, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object, Array]),
    __metadata("design:returntype", Promise)
], CampaignUpdateController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a campaign update' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'string', format: 'uuid' }),
    (0, swagger_1.ApiNoContentResponse)({ description: 'Campaign update deleted successfully' }),
    (0, roles_decorator_1.Roles)(['CAMPAIGN_CREATOR']),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CampaignUpdateController.prototype, "remove", null);
__decorate([
    (0, common_1.Delete)(':updateId/asset/:assetId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a specific asset from a campaign update' }),
    (0, swagger_1.ApiParam)({ name: 'updateId', type: 'string', format: 'uuid' }),
    (0, swagger_1.ApiParam)({ name: 'assetId', type: 'string', format: 'uuid' }),
    (0, swagger_1.ApiNoContentResponse)({ description: 'Asset deleted successfully' }),
    (0, roles_decorator_1.Roles)(['CAMPAIGN_CREATOR']),
    __param(0, (0, common_1.Param)('updateId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Param)('assetId', common_1.ParseUUIDPipe)),
    __param(2, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], CampaignUpdateController.prototype, "removeAsset", null);
exports.CampaignUpdateController = CampaignUpdateController = __decorate([
    (0, swagger_1.ApiTags)('Campaign Updates'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Controller)('campaign-update'),
    __metadata("design:paramtypes", [campaign_update_service_1.CampaignUpdateService])
], CampaignUpdateController);
//# sourceMappingURL=campaign-update.controller.js.map