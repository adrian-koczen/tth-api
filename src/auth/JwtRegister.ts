import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

export const JwtRegister = JwtModule.register({
  secret: jwtConstants.secret,
  signOptions: { expiresIn: '60m' },
});
