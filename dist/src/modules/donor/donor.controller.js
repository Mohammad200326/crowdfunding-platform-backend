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
exports.DonorController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const donors_swagger_dto_1 = require("./dto/donors.swagger.dto");
const donor_service_1 = require("./donor.service");
const create_donor_dto_1 = require("./dto/create-donor.dto");
const zod_validation_pipe_1 = require("../../pipes/zod-validation.pipe");
const api_util_1 = require("../auth/util/api.util");
const platform_express_1 = require("@nestjs/platform-express");
const donor_validation_schema_1 = require("./utils/donor.validation.schema");
let DonorController = class DonorController {
    donorService;
    constructor(donorService) {
        this.donorService = donorService;
    }
    create(createDonorDto) {
        return this.donorService.create(createDonorDto);
    }
    findAll(query) {
        return this.donorService.findAll(query);
    }
    findOne(id) {
        return this.donorService.findOne(id);
    }
    update(id, updateDonorDto, files) {
        return this.donorService.update(id, updateDonorDto, files);
    }
    remove(id) {
        return this.donorService.remove(+id);
    }
};
exports.DonorController = DonorController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_donor_dto_1.CreateDonorDto]),
    __metadata("design:returntype", void 0)
], DonorController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all donors with pagination',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'page',
        required: false,
        type: Number,
        description: 'Page number',
        example: 1,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'limit',
        required: false,
        type: Number,
        description: 'Items per page',
        example: 10,
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'List of donors',
        type: donors_swagger_dto_1.FindAllDonorsResponseDto,
    }),
    __param(0, (0, common_1.Query)(new zod_validation_pipe_1.ZodValidationPipe(api_util_1.paginationSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DonorController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get donor by id' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Donor details',
        type: donors_swagger_dto_1.DonorFindOneResponseDto,
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DonorController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update donor profile, user info, and identity' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({ type: donors_swagger_dto_1.UpdateDonorFormDto }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Donor updated successfully',
        type: donors_swagger_dto_1.UpdateDonorResponseDto,
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'idFront', maxCount: 1 },
        { name: 'idBack', maxCount: 1 },
        { name: 'selfieWithId', maxCount: 1 },
    ])),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)(new zod_validation_pipe_1.ZodValidationPipe(donor_validation_schema_1.updateDonorSchema))),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], DonorController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DonorController.prototype, "remove", null);
exports.DonorController = DonorController = __decorate([
    (0, swagger_1.ApiTags)('Donor'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Controller)('donor'),
    __metadata("design:paramtypes", [donor_service_1.DonorService])
], DonorController);
//# sourceMappingURL=donor.controller.js.map