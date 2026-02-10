"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const createCampaignCreatorDto = __importStar(require("./dto/create-campaign-creator.dto"));
const updateCampaignCreatorDto = __importStar(require("./dto/update-campaign-creator.dto"));
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
    (0, swagger_1.ApiOperation)({ summary: 'Create a new campaign creator profile' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Profile created',
        type: create_campaign_creator_swagger_dto_1.CampaignCreatorResponseDto,
    }),
    (0, common_1.UsePipes)(new zod_validation_pipe_1.ZodValidationPipe(createCampaignCreatorDto.CreateCampaignCreatorSchema)),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CampaignCreatorController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all campaign creators' }),
    (0, swagger_1.ApiOkResponse)({ type: [create_campaign_creator_swagger_dto_1.CampaignCreatorResponseDto] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CampaignCreatorController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a specific campaign creator by ID' }),
    (0, swagger_1.ApiOkResponse)({ type: create_campaign_creator_swagger_dto_1.CampaignCreatorResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CampaignCreatorController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update campaign creator details' }),
    (0, common_1.UsePipes)(new zod_validation_pipe_1.ZodValidationPipe(updateCampaignCreatorDto.UpdateCampaignCreatorSchema)),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], CampaignCreatorController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Delete campaign creator profile' }),
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