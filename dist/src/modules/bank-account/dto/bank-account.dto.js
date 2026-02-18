"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBankAccountSchema = exports.CreateBankAccountSchema = void 0;
const zod_1 = require("zod");
exports.CreateBankAccountSchema = zod_1.z.object({
    bankName: zod_1.z.string().min(1, 'Bank name is required'),
    iban: zod_1.z.string().min(1, 'IBAN is required'),
    notes: zod_1.z.string().optional().default(''),
});
exports.UpdateBankAccountSchema = zod_1.z.object({
    bankName: zod_1.z
        .string()
        .min(1, 'Bank name is required')
        .max(255, 'Bank name is too long')
        .optional(),
    iban: zod_1.z.string().min(1, 'IBAN is required'),
    notes: zod_1.z.string().optional(),
    isVerified: zod_1.z
        .union([zod_1.z.boolean(), zod_1.z.string()])
        .transform((val) => {
        if (typeof val === 'boolean')
            return val;
        if (val === 'true')
            return true;
        if (val === 'false')
            return false;
        return undefined;
    })
        .optional(),
});
//# sourceMappingURL=bank-account.dto.js.map