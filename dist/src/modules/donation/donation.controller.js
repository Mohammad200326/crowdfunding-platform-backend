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
const donation_query_dto_1 = require("./dto/donation-query.dto");
const paginated_donations_response_1 = require("./dto/paginated-donations.response");
const donation_swagger_dto_1 = require("./dto/donation.swagger.dto");
let DonationController = class DonationController {
    donationService;
    constructor(donationService) {
        this.donationService = donationService;
    }
    getAll(query) {
        return this.donationService.getAll(query);
    }
    getByCampaignId(campaignId, query) {
        return this.donationService.getByCampaignId(campaignId, query);
    }
    getMyDonations(user, query) {
        return this.donationService.getByUserId(user.id, query);
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
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all donations (paginated)' }),
    (0, swagger_1.ApiOkResponse)({ type: paginated_donations_response_1.PaginatedDonationsResponse }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [donation_query_dto_1.DonationQueryDto]),
    __metadata("design:returntype", void 0)
], DonationController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('campaign/:campaignId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get donations by campaignId (paginated)' }),
    (0, swagger_1.ApiParam)({ name: 'campaignId', type: String }),
    (0, swagger_1.ApiOkResponse)({ type: paginated_donations_response_1.PaginatedDonationsResponse }),
    __param(0, (0, common_1.Param)('campaignId')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, donation_query_dto_1.DonationQueryDto]),
    __metadata("design:returntype", void 0)
], DonationController.prototype, "getByCampaignId", null);
__decorate([
    (0, common_1.Get)('me'),
    (0, swagger_1.ApiOperation)({ summary: 'Get my donations (paginated)' }),
    (0, swagger_1.ApiOkResponse)({ type: paginated_donations_response_1.PaginatedDonationsResponse }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, donation_query_dto_1.DonationQueryDto]),
    __metadata("design:returntype", void 0)
], DonationController.prototype, "getMyDonations", null);
__decorate([
    (0, common_1.Post)('checkout'),
    (0, swagger_1.ApiOperation)({ summary: 'Create Stripe checkout session for donation' }),
    (0, swagger_1.ApiOkResponse)({ type: donation_checkout_response_1.DonationCheckoutResponse }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_donation_checkout_dto_1.CreateDonationCheckoutDto, Object]),
    __metadata("design:returntype", void 0)
], DonationController.prototype, "createCheckout", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get donation by id' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: String }),
    (0, swagger_1.ApiOkResponse)({ type: donation_swagger_dto_1.DonationDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DonationController.prototype, "getDonation", null);
exports.DonationController = DonationController = __decorate([
    (0, swagger_1.ApiTags)('Donation'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Controller)('donation'),
    __metadata("design:paramtypes", [donation_service_1.DonationService])
], DonationController);
//# sourceMappingURL=donation.controller.js.map