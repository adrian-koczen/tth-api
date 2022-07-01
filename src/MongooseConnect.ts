import { MongooseModule } from '@nestjs/mongoose';
import { DATABASE_URI } from './constants';

export const MongooseConnect = MongooseModule.forRoot(DATABASE_URI);
