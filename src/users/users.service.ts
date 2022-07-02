import { Injectable, BadRequestException } from '@nestjs/common';
import { User, UserDocument } from 'src/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { DeleteUser } from './interfaces';
import { Payload } from 'src/auth/interfaces';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private User: Model<UserDocument>) {}

  async create(body: User): Promise<string> {
    const { username, password, passwordAgain, email } = body;

    // Find username in database
    const user = await this.User.findOne({ username: username });
    if (user) {
      throw new BadRequestException('User exists');
    }

    // Passwords equality
    if (password !== passwordAgain) {
      throw new BadRequestException('Passwords are not the same');
    }

    // Encode password
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);

    // Create user
    await this.User.create({
      username: username,
      password: hash,
      email: email,
    });

    return 'User created successfully.';
  }

  async remove(user: any): Promise<string> {
    await this.User.findOneAndDelete({ username: user.username });
    return 'User removed';
  }
}
