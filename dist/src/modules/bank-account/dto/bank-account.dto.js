"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBankAccountSchema = exports.CreateBankAccountSchema = void 0;
const zod_1 = require("zod");
const ibanRegex = /^[A-Z]{2}[0-9]{2}[A-Z0-9]{1,30}$/;
const ibanMessage = 'Invalid IBAN format. Must be 15-34 characters: 2 uppercase letters, 2 digits, followed by alphanumeric characters (e.g. GB82WEST12345698765432)';
exports.CreateBankAccountSchema = zod_1.z.object({
    bankName: zod_1.z.string().min(1, 'Bank name is required'),
    iban: zod_1.z
        .string()
        .min(15, 'IBAN must be at least 15 characters')
        .max(34, 'IBAN must be at most 34 characters')
        .regex(ibanRegex, ibanMessage),
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
        .min(15, 'IBAN must be at least 15 characters')
        .max(34, 'IBAN must be at most 34 characters')
        .regex(ibanRegex, ibanMessage)
        .optional(),
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