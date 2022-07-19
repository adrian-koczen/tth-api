import { CACHE_MANAGER, Controller, Get, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Controller('chat')
export class ChatController {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
}
