import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ForgotPasswordDto } from './dto/auth.dto';
import { PasswordResetService } from './password-reset.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private passwordResetService: PasswordResetService,
  ) {}

  @Post()
  create(@Body() createAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }

  @Post('password/forgot')
  forgotPassword(@Body() email: string) {
    return this.passwordResetService.forgot(email);
  }
}
