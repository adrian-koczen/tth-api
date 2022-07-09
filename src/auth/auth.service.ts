import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDocument } from 'src/schemas/user/user.schema';
import { LoginUser } from 'src/schemas/auth/auth.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel('User') private User: Model<CreateUserDocument>,
  ) {}

  async login(body: LoginUser) {
    const { email, password } = body;
    const user = await this.User.findOne({ email });
    if (!user) {
      throw new NotFoundException('User not found.');
    }

    // Compare password
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      throw new ForbiddenException('Wrong credentials');
    }

    return {
      access_token: this.jwtService.sign({ username: user.username }),
    };
  }
}
