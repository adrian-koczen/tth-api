import { Injectable, BadRequestException } from '@nestjs/common';
import {
  Profile,
  CreateUserDocument,
  User,
} from 'src/schemas/user/User.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';
// Utills
import { generateSixDigitsCode } from './utills';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private User: Model<CreateUserDocument>) {}

  async create(body: User): Promise<string> {
    const { username, password, passwordAgain, email } = body;

    // Find username in database
    const user = await this.User.findOne({ username: username });
    if (user) {
      throw new BadRequestException('User exists');
    }

    // Find email in database
    const emailInDatabase = await this.User.findOne({ email: email });
    if (emailInDatabase) {
      throw new BadRequestException('Email exists');
    }

    // Passwords equality
    if (password !== passwordAgain) {
      throw new BadRequestException('Passwords are not the same');
    }

    // Encode password
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);

    // Generate email verify code
    const emailVerifyCode = await generateSixDigitsCode();

    // Create user
    await this.User.create({
      username: username,
      password: hash,
      email: email,
      emailVerified: {
        isVerified: false,
        verifyCode: emailVerifyCode,
      },
    });

    return 'User created - email verify required.';
  }

  async emailVerify(): Promise<string> {
    return 'User email verified.';
  }

  async remove(user: any): Promise<string> {
    await this.User.findOneAndDelete({ username: user.username });
    return 'User removed';
  }

  async setupProfile(requestUser, body: Profile): Promise<string> {
    const user = await this.User.findOne({ username: requestUser.username });
    user.profile = body;
    user.save();
    return 'Profile updated.';
  }
}
