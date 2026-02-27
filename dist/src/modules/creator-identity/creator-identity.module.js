"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatorIdentityModule = void 0;
const common_1 = require("@nestjs/common");
const creator_identity_service_1 = require("./creator-identity.service");
const creator_identity_controller_1 = require("./creator-identity.controller");
const file_module_1 = require("../file/file.module");
let CreatorIdentityModule = class CreatorIdentityModule {
};
exports.CreatorIdentityModule = CreatorIdentityModule;
exports.CreatorIdentityModule = CreatorIdentityModule = __decorate([
    (0, common_1.Module)({
        imports: [file_module_1.FileModule],
        controllers: [creator_identity_controller_1.CreatorIdentityController],
        providers: [creator_identity_service_1.CreatorIdentityService],
        exports: [creator_identity_service_1.CreatorIdentityService],
    })
], CreatorIdentityModule);
//# sourceMappingURL=creator-identity.module.js.map