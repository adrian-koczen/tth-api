import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { MongooseConnect } from './MongooseConnect';
import { throttlerProvider, throttlerModule } from './config/throttler.config';

@Module({
  imports: [AuthModule, UsersModule, MongooseConnect, throttlerModule],
  providers: [throttlerProvider],
})
export class AppModule {}
