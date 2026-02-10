"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampaignCreatorModule = void 0;
const common_1 = require("@nestjs/common");
const campaign_creator_service_1 = require("./campaign-creator.service");
const campaign_creator_controller_1 = require("./campaign-creator.controller");
const file_module_1 = require("../file/file.module");
let CampaignCreatorModule = class CampaignCreatorModule {
};
exports.CampaignCreatorModule = CampaignCreatorModule;
exports.CampaignCreatorModule = CampaignCreatorModule = __decorate([
    (0, common_1.Module)({
        imports: [file_module_1.FileModule],
        controllers: [campaign_creator_controller_1.CampaignCreatorController],
        providers: [campaign_creator_service_1.CampaignCreatorService],
    })
], CampaignCreatorModule);
//# sourceMappingURL=campaign-creator.module.js.map