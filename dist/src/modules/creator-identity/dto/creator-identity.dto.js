"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCreatorIdentitySchema = exports.CreateCreatorIdentitySchema = void 0;
const zod_1 = require("zod");
exports.CreateCreatorIdentitySchema = zod_1.z.object({
    fullNameOnId: zod_1.z.string().min(2).max(150),
    idNumber: zod_1.z.string().max(64),
});
exports.UpdateCreatorIdentitySchema = zod_1.z.object({
    fullNameOnId: zod_1.z.string().min(2).max(150).optional(),
    idNumber: zod_1.z.string().max(64).optional().nullable(),
});
//# sourceMappingURL=creator-identity.dto.js.map