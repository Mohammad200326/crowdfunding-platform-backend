"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileModule = void 0;
const common_1 = require("@nestjs/common");
const file_service_1 = require("./file.service");
const platform_express_1 = require("@nestjs/platform-express");
const imagekit_provider_1 = require("./imagekit.provider");
let FileModule = class FileModule {
};
exports.FileModule = FileModule;
exports.FileModule = FileModule = __decorate([
    (0, common_1.Module)({
        imports: [
            platform_express_1.MulterModule.registerAsync({
                imports: [FileModule],
                useFactory: (fileService) => {
                    return {
                        storage: fileService.imageKitMulterStorage(),
                        limits: {
                            fileSize: 2 * 1024 * 1024,
                        },
                        fileFilter: (req, file, cb) => {
                            cb(null, true);
                        },
                    };
                },
                inject: [file_service_1.FileService],
            }),
        ],
        providers: [file_service_1.FileService, imagekit_provider_1.ImageKitProvider],
        exports: [file_service_1.FileService, platform_express_1.MulterModule],
    })
], FileModule);
//# sourceMappingURL=file.module.js.map