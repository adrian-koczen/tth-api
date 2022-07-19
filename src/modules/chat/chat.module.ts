import { Module, CacheModule } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { EventGateway } from './events.gateway';

@Module({
  providers: [EventGateway],
  controllers: [ChatController],
  exports: [EventGateway],
  imports: [CacheModule.register()],
})
export class ChatModule {}
