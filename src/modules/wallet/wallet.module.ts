import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WalletSchema } from './schemas/wallet.js';
import { WalletService } from './services/wallet.service.js';
import { WalletController } from './controllers/index.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Wallet', schema: WalletSchema }]),
    AuthModule,
  ],
  controllers: [WalletController],
  providers: [WalletService],
  exports: [],
})
export class WalletModule {}
