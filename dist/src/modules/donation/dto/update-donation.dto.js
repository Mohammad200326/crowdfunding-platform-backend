"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDonationDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_donation_dto_1 = require("./create-donation.dto");
class UpdateDonationDto extends (0, swagger_1.PartialType)(create_donation_dto_1.CreateDonationDto) {
}
exports.UpdateDonationDto = UpdateDonationDto;
//# sourceMappingURL=update-donation.dto.js.map