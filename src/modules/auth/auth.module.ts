import { Module } from '@nestjs/common';
import { AuthController } from './controllers/index.js';
import { AuthService, Encryption } from './services.ts';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema.js';
import { JwtAuthGuard } from './guards/jwt-auth.guard.js';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.registerAsync({
      imports: [AuthModule],
      useFactory: async () => ({
        secret: 'teste123',
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, Encryption, JwtService, JwtAuthGuard],
  exports: [AuthService, JwtAuthGuard],
})
export class AuthModule {}
