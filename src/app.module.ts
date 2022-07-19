import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { MongooseConnect } from './MongooseConnect';
import { throttlerProvider, throttlerModule } from './config/throttler.config';
import { ChatModule } from './modules/chat/chat.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ChatModule,
    MongooseConnect,
    throttlerModule,
  ],
  providers: [throttlerProvider],
})
export class AppModule {}
