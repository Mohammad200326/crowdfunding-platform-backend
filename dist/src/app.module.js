"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const auth_module_1 = require("./modules/auth/auth.module");
const database_module_1 = require("./modules/database/database.module");
const file_module_1 = require("./modules/file/file.module");
const donor_module_1 = require("./modules/donor/donor.module");
const campaign_creator_module_1 = require("./modules/campaign-creator/campaign-creator.module");
const user_module_1 = require("./modules/user/user.module");
const campaign_module_1 = require("./modules/campaign/campaign.module");
const campaign_update_module_1 = require("./modules/campaign-update/campaign-update.module");
const bank_account_module_1 = require("./modules/bank-account/bank-account.module");
const roles_guard_1 = require("./modules/auth/guards/roles.guard");
const core_1 = require("@nestjs/core");
const auth_guard_1 = require("./modules/auth/guards/auth.guard");
const donor_identity_module_1 = require("./modules/donor-identity/donor-identity.module");
const donation_module_1 = require("./modules/donation/donation.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            auth_module_1.AuthModule,
            database_module_1.DatabaseModule,
            file_module_1.FileModule,
            donor_module_1.DonorModule,
            campaign_creator_module_1.CampaignCreatorModule,
            user_module_1.UserModule,
            campaign_module_1.CampaignModule,
            campaign_update_module_1.CampaignUpdateModule,
            bank_account_module_1.BankAccountModule,
            donor_identity_module_1.DonorIdentityModule,
            donation_module_1.DonationModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_GUARD,
                useClass: auth_guard_1.AuthGuard,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: roles_guard_1.RolesGuard,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map