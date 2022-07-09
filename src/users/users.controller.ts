import {
  Body,
  Controller,
  Delete,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { ThrottlerGuard, Throttle } from '@nestjs/throttler';
// Schemas
import { User, Profile, EmailVerify } from 'src/schemas/user/user.schema';

@ApiTags('user')
@Controller('user')
export class UsersController {
  constructor(private UserService: UsersService) {}

  @ApiOkResponse({ description: 'User created.' })
  @Post()
  create(@Body() body: User) {
    return this.UserService.create(body);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ description: 'User removed.' })
  @UseGuards(AuthGuard('jwt'))
  @Delete()
  remove(@Req() req: Request) {
    return this.UserService.remove(req.user);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Profile updated.' })
  @UseGuards(AuthGuard('jwt'))
  @Put()
  updateProfile(@Req() req: Request, @Body() body: Profile) {
    return this.UserService.setupProfile(req.user, body);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ description: 'User email verified.' })
  @UseGuards(AuthGuard('jwt'))
  @UseGuards(ThrottlerGuard)
  @Throttle(60, 3600)
  @Post('/emailVerify')
  verifyEmail(@Req() req: Request, @Body() body: EmailVerify) {
    return this.UserService.verifyEmail(req.user, body);
  }
}
