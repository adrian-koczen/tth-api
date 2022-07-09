import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';

export const throttlerProvider = {
  provide: APP_GUARD,
  useClass: ThrottlerGuard,
};

export const throttlerModule = ThrottlerModule.forRoot({
  ttl: 60,
  limit: 5000,
});
