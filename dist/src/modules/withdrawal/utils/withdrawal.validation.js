"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlatformProfitQuerySchema = exports.withdrawalSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.withdrawalSchema = zod_1.default.object({
    starsNumber: zod_1.default.number().int().positive(),
    bankAccountId: zod_1.default.string().uuid().optional(),
});
exports.PlatformProfitQuerySchema = zod_1.default.object({
    from: zod_1.default.coerce.date().optional(),
    to: zod_1.default.coerce.date().optional(),
});
//# sourceMappingURL=withdrawal.validation.js.map