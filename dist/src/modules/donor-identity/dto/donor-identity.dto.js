"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDonorIdentitySchema = exports.CreateDonorIdentitySchema = void 0;
const zod_1 = require("zod");
exports.CreateDonorIdentitySchema = zod_1.z.object({
    fullNameOnId: zod_1.z.string().min(2).max(150),
    idNumber: zod_1.z.string().max(64),
});
exports.UpdateDonorIdentitySchema = zod_1.z.object({
    fullNameOnId: zod_1.z.string().min(2).max(150).optional(),
    idNumber: zod_1.z.string().max(64).optional().nullable(),
});
//# sourceMappingURL=donor-identity.dto.js.map