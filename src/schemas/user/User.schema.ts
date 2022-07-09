import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, Max } from 'class-validator';
import { Roles } from 'src/auth/interfaces';

@Schema()
export class EmailVerify {
  @ApiProperty()
  @Prop()
  @IsNotEmpty()
  @IsNumber()
  @Max(999999)
  verifyCode: number;
}

@Schema()
export class EmailVerified {
  @Prop()
  isVerified: boolean;

  @Prop()
  verifyCode: number | null;
}

@Schema()
export class Profile {
  @ApiProperty()
  @Prop()
  @IsNotEmpty()
  firstname: string;

  @ApiProperty()
  @Prop()
  @IsNotEmpty()
  lastname: string;

  @ApiProperty()
  @Prop()
  @IsNotEmpty()
  phoneNumber: string;
}

@Schema()
export class User {
  @ApiProperty()
  @IsNotEmpty()
  @Prop({ required: true })
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @Prop({ required: true })
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @Prop()
  passwordAgain: string;

  @Prop({ type: EmailVerified })
  emailVerified: EmailVerified;

  @ApiProperty()
  @IsEmail()
  @Prop({ required: true })
  email: string;

  @Prop({ default: Roles.user })
  role: string;

  @Prop({ type: Profile })
  profile: Profile;
}

export type CreateUserDocument = Document & User;

export const UserSchema = SchemaFactory.createForClass(User);
