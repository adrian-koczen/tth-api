import { Injectable } from '@nestjs/common';
import { UserSchema, User, UserDocument } from 'src/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private UserSchema: Model<UserDocument>) {}

  async register(body: User): Promise<User> {
    const { username, password, email } = body;
    const createdUser = new this.UserSchema({ username, password, email });
    return createdUser.save();
  }
}
