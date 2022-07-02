import { Body, Controller, Delete, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/schemas/user.schema';
import { ApiTags, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

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
}
