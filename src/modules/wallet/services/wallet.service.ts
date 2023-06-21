import { Injectable, HttpStatus, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WalletDto } from '../schemas';
import { AuthService } from 'src/modules/auth/services.ts';

@Injectable()
export class WalletService {
  constructor(
    @InjectModel('Wallet') private readonly walletModel: Model<WalletDto>,
    private readonly authService: AuthService,
  ) {}

  async create(newWallet: WalletDto) {
    const createdWallet = await new this.walletModel(newWallet);
    return await createdWallet.save();
  }

  async findWalletByUser(userId: string) {
    const wallets = await this.walletModel.find({
      usersIds: { $in: [userId] },
    });
    return wallets;
  }

  async calculateTotalBalance(userId: string) {
    const wallets = await this.findWalletByUser(userId);
    if (wallets.length <= 0) {
      return HttpStatus.NOT_FOUND;
    }
    let total = 0;
    for (const wallet of wallets) {
      total = Number(wallet.balance) + Number(total);
    }
    return total;
  }

  async addUser(walletId: string, userId: string) {
    const wallet = await this.walletModel.findById(walletId);
    if (!wallet) {
      return HttpStatus.NOT_FOUND;
    }
    wallet.usersIds.push(userId);
    return await wallet.save();
  }

  async updateBalance(walletId: string, token: string, value: number) {
    const wallet = await this.walletModel.findById(walletId);
    const user = await this.authService.findByToken(token);
    let isUserWallet = false;
    for (const walletUsers of wallet.usersIds) {
      if (walletUsers === user._id) {
        isUserWallet = true;
      }
    }
    if (!wallet || !user) {
      return HttpStatus.NOT_FOUND;
    }
    if (!isUserWallet) {
      Logger.error(`This wallet is not from ${user.id}`);
    }
    wallet.balance = value;
    return await wallet.save();
  }

  async plusBalance(walletId: string, token: string, value: number) {
    const wallet = await this.walletModel.findById(walletId);
    const user = await this.authService.findByToken(token);
    let isUserWallet = false;
    for (const walletUsers of wallet.usersIds) {
      if (walletUsers === user._id) {
        isUserWallet = true;
      }
    }
    if (!wallet || !user) {
      return HttpStatus.NOT_FOUND;
    }
    if (!isUserWallet) {
      Logger.error(`This wallet is not from ${user.id}`);
    }
    wallet.balance = wallet.balance + value;
    return await wallet.save();
  }

  async minusBalance(walletId: string, token: string, value: number) {
    const wallet = await this.walletModel.findById(walletId);
    const user = await this.authService.findByToken(token);
    let isUserWallet = false;
    for (const walletUsers of wallet.usersIds) {
      if (walletUsers === user._id) {
        isUserWallet = true;
      }
    }
    if (!wallet || !user) {
      return HttpStatus.NOT_FOUND;
    }
    if (!isUserWallet) {
      Logger.error(`This wallet is not from ${user.id}`);
    }
    wallet.balance = wallet.balance - value;
    return await wallet.save();
  }
}
