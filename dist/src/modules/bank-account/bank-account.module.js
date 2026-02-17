"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankAccountModule = void 0;
const common_1 = require("@nestjs/common");
const bank_account_controller_1 = require("./bank-account.controller");
const bank_account_service_1 = require("./bank-account.service");
const database_module_1 = require("../database/database.module");
const file_module_1 = require("../file/file.module");
let BankAccountModule = class BankAccountModule {
};
exports.BankAccountModule = BankAccountModule;
exports.BankAccountModule = BankAccountModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule, file_module_1.FileModule],
        controllers: [bank_account_controller_1.BankAccountController],
        providers: [bank_account_service_1.BankAccountService],
        exports: [bank_account_service_1.BankAccountService],
    })
], BankAccountModule);
//# sourceMappingURL=bank-account.module.js.map