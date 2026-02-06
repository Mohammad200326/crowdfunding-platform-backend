"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageKitProvider = exports.imageKitToken = void 0;
const nodejs_1 = __importDefault(require("@imagekit/nodejs"));
const config_1 = require("@nestjs/config");
exports.imageKitToken = 'ImageKitProvider';
exports.ImageKitProvider = {
    provide: exports.imageKitToken,
    useFactory: (configService) => {
        return new nodejs_1.default({
            privateKey: configService.getOrThrow('IMAGEKIT_SECRET_KEY'),
        });
    },
    inject: [config_1.ConfigService],
};
//# sourceMappingURL=imagekit.provider.js.map