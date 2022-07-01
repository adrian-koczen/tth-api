import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseConnect } from './MongooseConnect';

@Module({
  imports: [AuthModule, UsersModule, MongooseConnect],
})
export class AppModule {}
