import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from './auth/auth.module';
import { WalletModule } from './wallet/wallet.module';

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb+srv://rafaelkrueger565:ZiSMug9dNU9YlOF1@wallet.k4ak6pf.mongodb.net/
  `),
    ScheduleModule.forRoot(),
    AuthModule,
    WalletModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
