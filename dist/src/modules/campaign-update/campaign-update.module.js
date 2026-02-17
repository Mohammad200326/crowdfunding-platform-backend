"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampaignUpdateModule = void 0;
const common_1 = require("@nestjs/common");
const campaign_update_controller_1 = require("./campaign-update.controller");
const campaign_update_service_1 = require("./campaign-update.service");
const database_module_1 = require("../database/database.module");
const file_module_1 = require("../file/file.module");
let CampaignUpdateModule = class CampaignUpdateModule {
};
exports.CampaignUpdateModule = CampaignUpdateModule;
exports.CampaignUpdateModule = CampaignUpdateModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule, file_module_1.FileModule],
        controllers: [campaign_update_controller_1.CampaignUpdateController],
        providers: [campaign_update_service_1.CampaignUpdateService],
        exports: [campaign_update_service_1.CampaignUpdateService],
    })
], CampaignUpdateModule);
//# sourceMappingURL=campaign-update.module.js.map