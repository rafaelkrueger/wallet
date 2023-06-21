import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  cellphone: String,
  password: String,
  gender: String,
  birthDate: String,
  timezone: String,
  token: String,
});

export class UserDto extends Document {
  id: ObjectId;
  @ApiProperty({ example: 'Rafael Krueger' })
  name: string;
  @ApiProperty({ example: 'rafaelkrueger565@email.com' })
  email: string;
  @ApiProperty({ example: '99 99999-99999' })
  cellphone: string;
  @ApiProperty({ example: '123456789' })
  password: string;
  @ApiProperty({ example: 'Masculine' })
  gender: string;
  @ApiProperty({ example: '25/11/2002' })
  birthDate: string;
  @ApiProperty({ example: 'Europe/London' })
  timezone: string;
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkY3MDQ...',
  })
  token: string;
}
