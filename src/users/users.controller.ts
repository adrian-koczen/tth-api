import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/schemas/user.schema';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UsersController {
  constructor(private UserService: UsersService) {}

  @Get()
  findOne(): string {
    return 'HelloWorld';
  }

  @Post()
  create(@Body() body: User) {
    return this.UserService.register(body);
  }
}
