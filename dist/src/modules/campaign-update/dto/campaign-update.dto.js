"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCampaignUpdateSchema = exports.CreateCampaignUpdateSchema = void 0;
const zod_1 = require("zod");
exports.CreateCampaignUpdateSchema = zod_1.z.object({
    campaignId: zod_1.z.string().uuid('Campaign ID must be a valid UUID'),
    title: zod_1.z.string().min(1, 'Title is required').max(255, 'Title is too long'),
    description: zod_1.z.string().min(1, 'Description is required'),
});
exports.UpdateCampaignUpdateSchema = zod_1.z.object({
    title: zod_1.z
        .string()
        .min(1, 'Title is required')
        .max(255, 'Title is too long')
        .optional(),
    description: zod_1.z.string().min(1, 'Description is required').optional(),
});
//# sourceMappingURL=campaign-update.dto.js.map