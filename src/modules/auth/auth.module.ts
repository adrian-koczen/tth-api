import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/modules/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { JwtRegister } from 'src/config/jwt.config';
import { JwtStrategy } from 'src/strategies/jwt.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/schemas/user/user.schema';

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
