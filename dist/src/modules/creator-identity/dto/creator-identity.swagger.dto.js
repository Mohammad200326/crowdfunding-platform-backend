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
exports.GetCreatorIdentityByCreatorResponseDto = exports.CreatorIdentityDto = exports.CreatorIdentityAssetDto = exports.UpdateCreatorIdentityFormDto = exports.CreateCreatorIdentityFormDto = exports.CreateCreatorIdentityDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
class CreateCreatorIdentityDto {
    fullNameOnId;
    idNumber;
}
exports.CreateCreatorIdentityDto = CreateCreatorIdentityDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Ahmed Mahmoud' }),
    __metadata("design:type", String)
], CreateCreatorIdentityDto.prototype, "fullNameOnId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'A123456789', nullable: true }),
    __metadata("design:type", Object)
], CreateCreatorIdentityDto.prototype, "idNumber", void 0);
class CreateCreatorIdentityFormDto extends CreateCreatorIdentityDto {
    idFront;
    idBack;
    selfieWithId;
}
exports.CreateCreatorIdentityFormDto = CreateCreatorIdentityFormDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', format: 'binary' }),
    __metadata("design:type", Object)
], CreateCreatorIdentityFormDto.prototype, "idFront", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', format: 'binary' }),
    __metadata("design:type", Object)
], CreateCreatorIdentityFormDto.prototype, "idBack", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', format: 'binary' }),
    __metadata("design:type", Object)
], CreateCreatorIdentityFormDto.prototype, "selfieWithId", void 0);
class UpdateCreatorIdentityFormDto {
    fullNameOnId;
    idNumber;
    idFront;
    idBack;
    selfieWithId;
}
exports.UpdateCreatorIdentityFormDto = UpdateCreatorIdentityFormDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Ahmed Mahmoud Hassan' }),
    __metadata("design:type", String)
], UpdateCreatorIdentityFormDto.prototype, "fullNameOnId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'A123456789', nullable: true }),
    __metadata("design:type", Object)
], UpdateCreatorIdentityFormDto.prototype, "idNumber", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: 'string', format: 'binary' }),
    __metadata("design:type", Object)
], UpdateCreatorIdentityFormDto.prototype, "idFront", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: 'string', format: 'binary' }),
    __metadata("design:type", Object)
], UpdateCreatorIdentityFormDto.prototype, "idBack", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: 'string', format: 'binary' }),
    __metadata("design:type", Object)
], UpdateCreatorIdentityFormDto.prototype, "selfieWithId", void 0);
class CreatorIdentityAssetDto {
    id;
    kind;
    url;
    fileType;
    fileSizeInKB;
    createdAt;
}
exports.CreatorIdentityAssetDto = CreatorIdentityAssetDto;
__decorate([
    (0, swagger_1.ApiProperty)({ format: 'uuid' }),
    __metadata("design:type", String)
], CreatorIdentityAssetDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: client_1.AssetKind }),
    __metadata("design:type", String)
], CreatorIdentityAssetDto.prototype, "kind", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'https://cdn.example.com/files/id-front.jpg',
    }),
    __metadata("design:type", String)
], CreatorIdentityAssetDto.prototype, "url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'image/jpeg' }),
    __metadata("design:type", String)
], CreatorIdentityAssetDto.prototype, "fileType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 245 }),
    __metadata("design:type", Number)
], CreatorIdentityAssetDto.prototype, "fileSizeInKB", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ format: 'date-time' }),
    __metadata("design:type", Date)
], CreatorIdentityAssetDto.prototype, "createdAt", void 0);
class CreatorIdentityDto {
    id;
    creatorId;
    fullNameOnId;
    idNumber;
    createdAt;
    updatedAt;
    assets;
}
exports.CreatorIdentityDto = CreatorIdentityDto;
__decorate([
    (0, swagger_1.ApiProperty)({ format: 'uuid' }),
    __metadata("design:type", String)
], CreatorIdentityDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ format: 'uuid' }),
    __metadata("design:type", String)
], CreatorIdentityDto.prototype, "creatorId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Ahmed Mahmoud Hassan' }),
    __metadata("design:type", String)
], CreatorIdentityDto.prototype, "fullNameOnId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'A123456789', nullable: true }),
    __metadata("design:type", Object)
], CreatorIdentityDto.prototype, "idNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ format: 'date-time' }),
    __metadata("design:type", Date)
], CreatorIdentityDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ format: 'date-time' }),
    __metadata("design:type", Date)
], CreatorIdentityDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [CreatorIdentityAssetDto] }),
    __metadata("design:type", Array)
], CreatorIdentityDto.prototype, "assets", void 0);
class GetCreatorIdentityByCreatorResponseDto {
    creatorIdentity;
}
exports.GetCreatorIdentityByCreatorResponseDto = GetCreatorIdentityByCreatorResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: CreatorIdentityDto }),
    __metadata("design:type", CreatorIdentityDto)
], GetCreatorIdentityByCreatorResponseDto.prototype, "creatorIdentity", void 0);
//# sourceMappingURL=creator-identity.swagger.dto.js.map