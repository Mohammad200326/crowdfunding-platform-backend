"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withdrawalSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.withdrawalSchema = zod_1.default.object({
    starsNumber: zod_1.default.number().int().positive(),
    bankAccountId: zod_1.default.string().uuid().optional(),
});
//# sourceMappingURL=withdrawal.validation.js.map