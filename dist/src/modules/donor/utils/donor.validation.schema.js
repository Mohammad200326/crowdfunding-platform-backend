"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDonorSchema = exports.donorValidationSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const donor_identity_dto_1 = require("../../donor-identity/dto/donor-identity.dto");
exports.donorValidationSchema = zod_1.default.object({
    firstName: zod_1.default.string().min(2).max(100),
    lastName: zod_1.default.string().min(2).max(100),
    email: zod_1.default.string().email().toLowerCase(),
    password: zod_1.default.string().min(6).max(100),
    dateOfBirth: zod_1.default
        .string()
        .refine((date) => !isNaN(Date.parse(date)), {
        message: 'Invalid date format',
    })
        .transform((date) => new Date(date)),
    phoneNumber: zod_1.default.string().min(7).max(15).optional(),
    country: zod_1.default.string().min(2).max(100).optional(),
    notes: zod_1.default.string().max(500).optional(),
    donorProfile: zod_1.default
        .object({
        areasOfInterest: zod_1.default.string().min(1).optional(),
        preferredCampaignTypes: zod_1.default.string().min(1).optional(),
        geographicScope: zod_1.default.enum(['local', 'global']).optional(),
        targetAudience: zod_1.default.string().min(2).max(100).optional(),
        preferredCampaignSize: zod_1.default.coerce.number().positive().optional(),
        preferredCampaignVisibility: zod_1.default.string().min(2).max(100).optional(),
    })
        .optional(),
});
exports.updateDonorSchema = exports.donorValidationSchema
    .extend(donor_identity_dto_1.UpdateDonorIdentitySchema.shape)
    .omit({ password: true })
    .partial();
//# sourceMappingURL=donor.validation.schema.js.map