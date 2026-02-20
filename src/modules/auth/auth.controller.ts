import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { PasswordResetService } from './password-reset.service';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import {
  ForgotPasswordSchema,
  ResetPasswordSchema,
  VerifyOtpSchema,
} from './types/password-reset.schema';
import type {
  ForgotPasswordDTO,
  ResetPasswordDTO,
  VerifyOtpDTO,
  LoginDTO,
  registerDonorDTO,
} from './dto/auth.dto';
import { LoginSchema } from './dto/auth.dto';
import { donorValidationSchema } from '../donor/utils/donor.validation.schema';
import {
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  ExpiresInResponseDto,
  ForgotPasswordDto,
  LoginResponseDto,
  ResetPasswordDto,
  VerifyForgotOtpDto,
  RegisterDonorDto,
  RegisterDonorResponseDto,
  LoginRequestDto,
  RegisterCampaignCreatorFormDto,
  RegisterCampaignCreatorResponseDto,
} from './dto/auth.swagger.dto';
import { IsPublic } from 'src/utils/decorators/public.decorator';
import type { RegisterCampaignCreatorFormDTO } from './dto/register-campaign-creator.schema';
import { RegisterCampaignCreatorFormSchema } from './dto/register-campaign-creator.schema';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private passwordResetService: PasswordResetService,
  ) {}

  @Post('register/donor')
  @IsPublic(true)
  @ApiOperation({ summary: 'Register new donor' })
  @ApiBody({ type: RegisterDonorDto })
  @ApiOkResponse({ type: RegisterDonorResponseDto })
  async registerDonor(
    @Body(new ZodValidationPipe(donorValidationSchema))
    registerDonorDto: registerDonorDTO,
  ) {
    return await this.authService.registerDonor(registerDonorDto);
  }

  // @Post('register/campaign-creator')
  // @IsPublic(true)
  // @ApiOperation({ summary: 'Register a new campaign creator' })
  // @ApiBody({ type: RegisterCampaignCreatorDto })
  // @ApiCreatedResponse({
  //   description: 'Campaign creator registered successfully',
  //   type: RegisterCampaignCreatorResponseDto,
  // })
  // async newRegisterCampaignCreator(
  //   @Body(new ZodValidationPipe(RegisterCampaignCreatorSchema))
  //   dto: RegisterCampaignCreatorDTO,
  // ) {
  //   return await this.authService.registerCampaignCreator(dto);
  // }
  @Post('register/campaign-creator')
  @IsPublic(true)
  @ApiOperation({
    summary:
      'Register a new campaign creator (with optional institution documents)',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: RegisterCampaignCreatorFormDto })
  @ApiCreatedResponse({
    description: 'Campaign creator registered successfully',
    type: RegisterCampaignCreatorResponseDto,
  })
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'registrationCertificate', maxCount: 1 },
      { name: 'commercialLicense', maxCount: 1 },
      { name: 'representativeIdPhoto', maxCount: 1 },
      { name: 'commissionerImage', maxCount: 1 },
      { name: 'authorizationLetter', maxCount: 1 },
    ]),
  )
  registerCampaignCreator(
    @Body(new ZodValidationPipe(RegisterCampaignCreatorFormSchema))
    dto: RegisterCampaignCreatorFormDTO,
    @UploadedFiles()
    files: {
      registrationCertificate?: Express.Multer.File[];
      commercialLicense?: Express.Multer.File[];
      representativeIdPhoto?: Express.Multer.File[];
      commissionerImage?: Express.Multer.File[];
      authorizationLetter?: Express.Multer.File[];
    },
  ) {
    return this.authService.registerCampaignCreatorForm(dto, files);
  }

  // LOGIN
  @Post('login')
  @IsPublic(true)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login with email and password' })
  @ApiBody({ type: LoginRequestDto })
  @ApiOkResponse({ type: LoginResponseDto })
  async login(@Body(new ZodValidationPipe(LoginSchema)) dto: LoginDTO) {
    return this.authService.login(dto);
  }

  @Post('password/forgot')
  @IsPublic(true)
  @ApiOperation({ summary: 'Send OTP for forgot password' })
  @ApiBody({ type: ForgotPasswordDto })
  @ApiOkResponse({ type: ExpiresInResponseDto })
  async forgot(
    @Body(new ZodValidationPipe(ForgotPasswordSchema))
    forgotPasswordDTO: ForgotPasswordDTO,
  ) {
    return this.passwordResetService.forgot(forgotPasswordDTO.email);
  }

  @Post('password/verify-otp')
  @IsPublic(true)
  @ApiOperation({ summary: 'Verify OTP and return reset token' })
  @ApiBody({ type: VerifyForgotOtpDto })
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        resetToken: { type: 'string', format: 'uuid' },
      },
      required: ['resetToken'],
    },
  })
  async verifyOTP(
    @Body(new ZodValidationPipe(VerifyOtpSchema))
    verifyOTPSchema: VerifyOtpDTO,
  ) {
    return this.passwordResetService.verify(
      verifyOTPSchema.email,
      verifyOTPSchema.otp,
    );
  }

  @Post('password/reset')
  @IsPublic(true)
  @ApiOperation({ summary: 'Reset password using reset token' })
  @ApiBody({ type: ResetPasswordDto })
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Password reset successfully',
        },
      },
      required: ['message'],
    },
  })
  async reset(
    @Body(new ZodValidationPipe(ResetPasswordSchema))
    resetPasswordDTO: ResetPasswordDTO,
  ) {
    return this.passwordResetService.reset(
      resetPasswordDTO.resetToken,
      resetPasswordDTO.password,
    );
  }
}
