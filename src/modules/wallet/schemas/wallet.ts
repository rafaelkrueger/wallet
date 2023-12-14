import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';

export const WalletSchema = new mongoose.Schema({
  name: String,
  usersIds: Array<any>,
  currency: String,
  balance: String,
});

export class WalletDto extends Document {
  id: ObjectId;
  @ApiProperty({ example: 'Wallet - Bradesco' })
  name: string;
  @ApiProperty({ example: '6492f433139a79cae6a3149e' })
  usersIds: string;
  @ApiProperty({ example: 'BRL' })
  currency: string;
  @ApiProperty({ example: 0 })
  balance: number;
}
