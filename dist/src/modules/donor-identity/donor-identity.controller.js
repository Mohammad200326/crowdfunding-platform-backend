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
exports.DonorIdentityController = void 0;
const common_1 = require("@nestjs/common");
const donor_identity_service_1 = require("./donor-identity.service");
const platform_express_1 = require("@nestjs/platform-express");
const zod_validation_pipe_1 = require("../../pipes/zod-validation.pipe");
const donor_identity_dto_1 = require("./dto/donor-identity.dto");
const swagger_1 = require("@nestjs/swagger");
const donor_identity_swagger_dto_1 = require("./dto/donor-identity.swagger.dto");
const user_decorator_1 = require("../../utils/decorators/user.decorator");
let DonorIdentityController = class DonorIdentityController {
    donorIdentityService;
    constructor(donorIdentityService) {
        this.donorIdentityService = donorIdentityService;
    }
    create(dto, user, files) {
        return this.donorIdentityService.create(dto, user, files);
    }
    getByDonorId(donorId) {
        return this.donorIdentityService.getByDonorId(donorId);
    }
    update(donorId, dto, files) {
        return this.donorIdentityService.updateByDonorId(donorId, dto, files);
    }
    remove(id) {
        return this.donorIdentityService.remove(id);
    }
};
exports.DonorIdentityController = DonorIdentityController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({ type: donor_identity_swagger_dto_1.CreateDonorIdentityFormDto }),
    (0, swagger_1.ApiCreatedResponse)({
        schema: {
            type: 'object',
            properties: {
                message: {
                    type: 'string',
                    example: 'Donor identity created successfully',
                },
                donorIdentity: {
                    type: 'object',
                    properties: {
                        id: { type: 'string', format: 'uuid' },
                        donorId: { type: 'string', format: 'uuid' },
                        createdAt: { type: 'string', format: 'date-time' },
                    },
                    required: ['id', 'donorId', 'createdAt'],
                },
            },
            required: ['message', 'donorIdentity'],
        },
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'idFront', maxCount: 1 },
        { name: 'idBack', maxCount: 1 },
        { name: 'selfieWithId', maxCount: 1 },
    ])),
    __param(0, (0, common_1.Body)(new zod_validation_pipe_1.ZodValidationPipe(donor_identity_dto_1.CreateDonorIdentitySchema))),
    __param(1, (0, user_decorator_1.User)()),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], DonorIdentityController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':donorId'),
    (0, swagger_1.ApiOkResponse)({ type: donor_identity_swagger_dto_1.GetDonorIdentityByDonorResponseDto }),
    __param(0, (0, common_1.Param)('donorId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DonorIdentityController.prototype, "getByDonorId", null);
__decorate([
    (0, common_1.Patch)(':donorId'),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({ type: donor_identity_swagger_dto_1.UpdateDonorIdentityFormDto }),
    (0, swagger_1.ApiOkResponse)({
        schema: {
            type: 'object',
            properties: {
                message: {
                    type: 'string',
                    example: 'Donor identity updated successfully',
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
    __param(0, (0, common_1.Param)('donorId')),
    __param(1, (0, common_1.Body)(new zod_validation_pipe_1.ZodValidationPipe(donor_identity_dto_1.UpdateDonorIdentitySchema))),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], DonorIdentityController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DonorIdentityController.prototype, "remove", null);
exports.DonorIdentityController = DonorIdentityController = __decorate([
    (0, swagger_1.ApiTags)('Donor Identity'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Controller)('donor-identity'),
    __metadata("design:paramtypes", [donor_identity_service_1.DonorIdentityService])
], DonorIdentityController);
//# sourceMappingURL=donor-identity.controller.js.map