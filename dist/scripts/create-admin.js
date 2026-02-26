"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const argon = __importStar(require("argon2"));
const client_1 = require("@prisma/client");
const database_service_1 = require("../src/modules/database/database.service");
async function run() {
    const prisma = new database_service_1.DatabaseService();
    await prisma.$connect();
    const email = 'admin@gmail.com';
    const password = 'admin123';
    if (!email || !password) {
        throw new Error('Missing EMAIL or PASSWORD');
    }
    const hashed = await argon.hash(password);
    await prisma.user.upsert({
        where: { email },
        update: { role: client_1.UserRole.ADMIN },
        create: {
            email,
            password: hashed,
            firstName: 'Admin',
            lastName: 'System',
            role: client_1.UserRole.ADMIN,
            country: 'EG',
        },
    });
    await prisma.$disconnect();
    console.log('Admin ensured');
}
run().catch((e) => {
    console.error(e);
    process.exit(1);
});
//# sourceMappingURL=create-admin.js.map