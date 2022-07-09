import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginUser } from 'src/schemas/auth/auth.schema';
import { ApiResponse } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiResponse({ status: 200, description: 'Return authorization token.' })
  @Post('login')
  login(@Body() Body: LoginUser) {
    return this.authService.login(Body);
  }
}
