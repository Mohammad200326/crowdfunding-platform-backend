"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DonationController = void 0;
const common_1 = require("@nestjs/common");
const donation_service_1 = require("./donation.service");
const swagger_1 = require("@nestjs/swagger");
const create_donation_checkout_dto_1 = require("./dto/create-donation-checkout.dto");
const donation_checkout_response_1 = require("./dto/donation-checkout.response");
const user_decorator_1 = require("../../utils/decorators/user.decorator");
let DonationController = class DonationController {
    donationService;
    constructor(donationService) {
        this.donationService = donationService;
    }
    createCheckout(dto, user) {
        return this.donationService.createCheckout(dto, user.id);
    }
    getDonation(id) {
        return this.donationService.getById(id);
    }
};
exports.DonationController = DonationController;
__decorate([
    (0, common_1.Post)('checkout'),
    (0, swagger_1.ApiOkResponse)({ type: donation_checkout_response_1.DonationCheckoutResponse }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_donation_checkout_dto_1.CreateDonationCheckoutDto, Object]),
    __metadata("design:returntype", void 0)
], DonationController.prototype, "createCheckout", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DonationController.prototype, "getDonation", null);
exports.DonationController = DonationController = __decorate([
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Controller)('donation'),
    __metadata("design:paramtypes", [donation_service_1.DonationService])
], DonationController);
//# sourceMappingURL=donation.controller.js.map