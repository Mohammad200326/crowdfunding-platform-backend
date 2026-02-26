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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetDonorIdentityByDonorResponseDto = exports.DonorIdentityDto = exports.DonorIdentityAssetDto = exports.UpdateDonorIdentityFormDto = exports.CreateDonorIdentityFormDto = exports.CreateDonorIdentityDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
class CreateDonorIdentityDto {
    fullNameOnId;
    idNumber;
}
exports.CreateDonorIdentityDto = CreateDonorIdentityDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Ahmed Mahmoud' }),
    __metadata("design:type", String)
], CreateDonorIdentityDto.prototype, "fullNameOnId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'A123456789', nullable: true }),
    __metadata("design:type", Object)
], CreateDonorIdentityDto.prototype, "idNumber", void 0);
class CreateDonorIdentityFormDto extends CreateDonorIdentityDto {
    idFront;
    idBack;
    selfieWithId;
}
exports.CreateDonorIdentityFormDto = CreateDonorIdentityFormDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', format: 'binary' }),
    __metadata("design:type", Object)
], CreateDonorIdentityFormDto.prototype, "idFront", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', format: 'binary' }),
    __metadata("design:type", Object)
], CreateDonorIdentityFormDto.prototype, "idBack", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', format: 'binary' }),
    __metadata("design:type", Object)
], CreateDonorIdentityFormDto.prototype, "selfieWithId", void 0);
class UpdateDonorIdentityFormDto {
    fullNameOnId;
    idNumber;
    idFront;
    idBack;
    selfieWithId;
}
exports.UpdateDonorIdentityFormDto = UpdateDonorIdentityFormDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Ahmed Mahmoud Hassan' }),
    __metadata("design:type", String)
], UpdateDonorIdentityFormDto.prototype, "fullNameOnId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'A123456789', nullable: true }),
    __metadata("design:type", Object)
], UpdateDonorIdentityFormDto.prototype, "idNumber", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: 'string', format: 'binary' }),
    __metadata("design:type", Object)
], UpdateDonorIdentityFormDto.prototype, "idFront", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: 'string', format: 'binary' }),
    __metadata("design:type", Object)
], UpdateDonorIdentityFormDto.prototype, "idBack", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: 'string', format: 'binary' }),
    __metadata("design:type", Object)
], UpdateDonorIdentityFormDto.prototype, "selfieWithId", void 0);
class DonorIdentityAssetDto {
    id;
    kind;
    url;
    fileType;
    fileSizeInKB;
    createdAt;
}
exports.DonorIdentityAssetDto = DonorIdentityAssetDto;
__decorate([
    (0, swagger_1.ApiProperty)({ format: 'uuid' }),
    __metadata("design:type", String)
], DonorIdentityAssetDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: client_1.AssetKind }),
    __metadata("design:type", String)
], DonorIdentityAssetDto.prototype, "kind", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'https://cdn.example.com/files/id-front.jpg',
    }),
    __metadata("design:type", String)
], DonorIdentityAssetDto.prototype, "url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'image/jpeg' }),
    __metadata("design:type", String)
], DonorIdentityAssetDto.prototype, "fileType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 245 }),
    __metadata("design:type", Number)
], DonorIdentityAssetDto.prototype, "fileSizeInKB", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ format: 'date-time' }),
    __metadata("design:type", Date)
], DonorIdentityAssetDto.prototype, "createdAt", void 0);
class DonorIdentityDto {
    id;
    donorId;
    fullNameOnId;
    idNumber;
    createdAt;
    updatedAt;
    assets;
}
exports.DonorIdentityDto = DonorIdentityDto;
__decorate([
    (0, swagger_1.ApiProperty)({ format: 'uuid' }),
    __metadata("design:type", String)
], DonorIdentityDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ format: 'uuid' }),
    __metadata("design:type", String)
], DonorIdentityDto.prototype, "donorId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Ahmed Mahmoud Hassan' }),
    __metadata("design:type", String)
], DonorIdentityDto.prototype, "fullNameOnId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'A123456789', nullable: true }),
    __metadata("design:type", Object)
], DonorIdentityDto.prototype, "idNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ format: 'date-time' }),
    __metadata("design:type", Date)
], DonorIdentityDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ format: 'date-time' }),
    __metadata("design:type", Date)
], DonorIdentityDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [DonorIdentityAssetDto] }),
    __metadata("design:type", Array)
], DonorIdentityDto.prototype, "assets", void 0);
class GetDonorIdentityByDonorResponseDto {
    donorIdentity;
}
exports.GetDonorIdentityByDonorResponseDto = GetDonorIdentityByDonorResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: DonorIdentityDto }),
    __metadata("design:type", DonorIdentityDto)
], GetDonorIdentityByDonorResponseDto.prototype, "donorIdentity", void 0);
//# sourceMappingURL=donor-identity.swagger.dto.js.map