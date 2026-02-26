"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DonorIdentityModule = void 0;
const common_1 = require("@nestjs/common");
const donor_identity_service_1 = require("./donor-identity.service");
const donor_identity_controller_1 = require("./donor-identity.controller");
const file_module_1 = require("../file/file.module");
let DonorIdentityModule = class DonorIdentityModule {
};
exports.DonorIdentityModule = DonorIdentityModule;
exports.DonorIdentityModule = DonorIdentityModule = __decorate([
    (0, common_1.Module)({
        imports: [file_module_1.FileModule],
        controllers: [donor_identity_controller_1.DonorIdentityController],
        providers: [donor_identity_service_1.DonorIdentityService],
        exports: [donor_identity_service_1.DonorIdentityService],
    })
], DonorIdentityModule);
//# sourceMappingURL=donor-identity.module.js.map