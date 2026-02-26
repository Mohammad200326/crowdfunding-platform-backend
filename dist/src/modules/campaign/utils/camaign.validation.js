"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.campaignPaginationSchema = exports.updateCampaignStatusValidationSchema = exports.updateCampaignValidationSchema = exports.campaignValidationSchema = void 0;
const zod_1 = require("zod");
const api_util_1 = require("../../auth/util/api.util");
exports.campaignValidationSchema = zod_1.z.object({
    title: zod_1.z.string().min(2).max(100),
    description: zod_1.z.string().min(2).max(1000),
    category: zod_1.z.enum([
        'WATER',
        'HEALTH',
        'ENVIROMENT',
        'FOOD',
        'EDUCATION',
        'SHELTER',
        'ANIMALS',
    ]),
    goal: zod_1.z.coerce.number().min(1),
    startDate: zod_1.z.coerce.date(),
    endDate: zod_1.z.coerce.date().min(new Date()),
    motivationMessage: zod_1.z.string().min(2).max(1000),
    notes: zod_1.z.string().max(1000).optional(),
    longDescription: zod_1.z.string().min(0).nullable(),
});
exports.updateCampaignValidationSchema = exports.campaignValidationSchema
    .partial()
    .extend({
    status: zod_1.z.enum(['pending', 'confirmed', 'rejected']).optional(),
    isVerified: zod_1.z.coerce.boolean().optional(),
    verificationStatus: zod_1.z.enum(['pending', 'confirmed', 'rejected']).optional(),
    isActive: zod_1.z.coerce.boolean().optional(),
    isDeleted: zod_1.z.coerce.boolean().optional(),
})
    .partial();
exports.updateCampaignStatusValidationSchema = zod_1.z.object({
    status: zod_1.z.enum(['pending', 'confirmed', 'rejected']),
});
exports.campaignPaginationSchema = api_util_1.paginationSchema.extend({
    title: zod_1.z.string().min(1).max(255).optional(),
    status: zod_1.z.enum(['pending', 'confirmed', 'rejected']).optional(),
});
//# sourceMappingURL=camaign.validation.js.map