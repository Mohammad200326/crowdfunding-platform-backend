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
exports.CreatorIdentityController = void 0;
const common_1 = require("@nestjs/common");
const creator_identity_service_1 = require("./creator-identity.service");
const platform_express_1 = require("@nestjs/platform-express");
const zod_validation_pipe_1 = require("../../pipes/zod-validation.pipe");
const creator_identity_dto_1 = require("./dto/creator-identity.dto");
const swagger_1 = require("@nestjs/swagger");
const creator_identity_swagger_dto_1 = require("./dto/creator-identity.swagger.dto");
const user_decorator_1 = require("../../utils/decorators/user.decorator");
let CreatorIdentityController = class CreatorIdentityController {
    creatorIdentityService;
    constructor(creatorIdentityService) {
        this.creatorIdentityService = creatorIdentityService;
    }
    create(dto, user, files) {
        return this.creatorIdentityService.create(dto, user, files);
    }
    getByCreatorId(creatorId) {
        return this.creatorIdentityService.getByCreatorId(creatorId);
    }
    update(creatorId, dto, files) {
        return this.creatorIdentityService.updateByCreatorId(creatorId, dto, files);
    }
    remove(id) {
        return this.creatorIdentityService.remove(id);
    }
};
exports.CreatorIdentityController = CreatorIdentityController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({ type: creator_identity_swagger_dto_1.CreateCreatorIdentityFormDto }),
    (0, swagger_1.ApiCreatedResponse)({
        schema: {
            type: 'object',
            properties: {
                message: {
                    type: 'string',
                    example: 'Creator identity created successfully',
                },
                creatorIdentity: {
                    type: 'object',
                    properties: {
                        id: { type: 'string', format: 'uuid' },
                        creatorId: { type: 'string', format: 'uuid' },
                        createdAt: { type: 'string', format: 'date-time' },
                    },
                    required: ['id', 'creatorId', 'createdAt'],
                },
            },
            required: ['message', 'creatorIdentity'],
        },
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'idFront', maxCount: 1 },
        { name: 'idBack', maxCount: 1 },
        { name: 'selfieWithId', maxCount: 1 },
    ])),
    __param(0, (0, common_1.Body)(new zod_validation_pipe_1.ZodValidationPipe(creator_identity_dto_1.CreateCreatorIdentitySchema))),
    __param(1, (0, user_decorator_1.User)()),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], CreatorIdentityController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':creatorId'),
    (0, swagger_1.ApiOkResponse)({ type: creator_identity_swagger_dto_1.GetCreatorIdentityByCreatorResponseDto }),
    __param(0, (0, common_1.Param)('creatorId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CreatorIdentityController.prototype, "getByCreatorId", null);
__decorate([
    (0, common_1.Patch)(':creatorId'),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({ type: creator_identity_swagger_dto_1.UpdateCreatorIdentityFormDto }),
    (0, swagger_1.ApiOkResponse)({
        schema: {
            type: 'object',
            properties: {
                message: {
                    type: 'string',
                    example: 'Creator identity updated successfully',
                },
            },
            required: ['message'],
        },
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'idFront', maxCount: 1 },
        { name: 'idBack', maxCount: 1 },
        { name: 'selfieWithId', maxCount: 1 },
    ])),
    __param(0, (0, common_1.Param)('creatorId')),
    __param(1, (0, common_1.Body)(new zod_validation_pipe_1.ZodValidationPipe(creator_identity_dto_1.UpdateCreatorIdentitySchema))),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], CreatorIdentityController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CreatorIdentityController.prototype, "remove", null);
exports.CreatorIdentityController = CreatorIdentityController = __decorate([
    (0, swagger_1.ApiTags)('Creator Identity'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Controller)('creator-identity'),
    __metadata("design:paramtypes", [creator_identity_service_1.CreatorIdentityService])
], CreatorIdentityController);
//# sourceMappingURL=creator-identity.controller.js.map