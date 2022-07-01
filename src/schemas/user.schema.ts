import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

@Schema()
export class User {
  @ApiProperty()
  @IsNotEmpty()
  @Prop()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @Prop()
  password: string;

  @ApiProperty()
  @IsEmail()
  @Prop()
  email: string;
}

export type UserDocument = Document & User;

export const UserSchema = SchemaFactory.createForClass(User);
