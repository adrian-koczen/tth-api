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
// Schemas
import { User, Profile } from 'src/schemas/user/createUser.schema';

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
}
