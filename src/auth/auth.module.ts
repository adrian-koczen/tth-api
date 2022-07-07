import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { JwtRegister } from '../strategies/JwtRegister';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/schemas/user/User.schema';

@Module({
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  imports: [
    UsersModule,
    PassportModule,
    JwtRegister,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  exports: [AuthService],
})
export class AuthModule {}
