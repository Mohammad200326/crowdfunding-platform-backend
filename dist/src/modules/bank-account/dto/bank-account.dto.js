"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBankAccountSchema = exports.CreateBankAccountSchema = void 0;
const zod_1 = require("zod");
exports.CreateBankAccountSchema = zod_1.z.object({
    bankName: zod_1.z
        .string()
        .min(1, 'Bank name is required')
        .max(255, 'Bank name is too long'),
    iban: zod_1.z
        .string()
        .min(1, 'IBAN is required')
        .regex(/^[A-Z]{2}[0-9]{2}[A-Z0-9]+$/, 'Invalid IBAN format. Must start with 2 letters, 2 digits, followed by alphanumeric characters'),
    notes: zod_1.z.string().optional().default(''),
});
exports.UpdateBankAccountSchema = zod_1.z.object({
    bankName: zod_1.z
        .string()
        .min(1, 'Bank name is required')
        .max(255, 'Bank name is too long')
        .optional(),
    iban: zod_1.z
        .string()
        .min(1, 'IBAN is required')
        .regex(/^[A-Z]{2}[0-9]{2}[A-Z0-9]+$/, 'Invalid IBAN format')
        .optional(),
    notes: zod_1.z.string().optional(),
    isVerified: zod_1.z.boolean().optional(),
});
//# sourceMappingURL=bank-account.dto.js.map