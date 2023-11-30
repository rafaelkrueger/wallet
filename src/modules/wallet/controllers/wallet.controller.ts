import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Patch,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { WalletService } from '../services/wallet.service';
import {
  CreateWalletApiDocumentation,
  FindUserWalletsApiDocumentation,
  MinusWalletBalanceApiDocumentation,
  PlusWalletBalanceApiDocumentation,
  ShareWalletWithUserApiDocumentation,
  TotalBalanceApiDocumentation,
  UpdateWalletBalanceApiDocumentation,
} from '../swagger';
import { WalletDto } from '../schemas';

@ApiTags('Wallet')
@Controller('/wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post('/')
  @CreateWalletApiDocumentation()
  async createUser(@Body() newWallet: WalletDto) {
    return await this.walletService.create(newWallet);
  }

  @Get('/total-balance/:userId')
  @TotalBalanceApiDocumentation()
  async totalBalance(@Param('userId') userId: string) {
    return await this.walletService.calculateTotalBalance(userId);
  }

  @Get('/:userId')
  @FindUserWalletsApiDocumentation()
  async findUser(@Param('userId') userId: string) {
    return await this.walletService.findWalletByUser(userId);
  }

  @Patch('/share-wallet')
  @ShareWalletWithUserApiDocumentation()
  async addUserToWallet(
    @Query('walletId') walletId: string,
    @Query('userId') userId: string,
  ) {
    return await this.walletService.addUser(walletId, userId);
  }

  @Patch('/update-balance')
  @UpdateWalletBalanceApiDocumentation()
  async updateWalletBalance(
    @Query('walletId') walletId: string,
    @Query('token') token: string,
    @Query('value') value: number,
  ) {
    return await this.walletService.updateBalance(walletId, token, value);
  }

  @Patch('/plus-balance')
  @PlusWalletBalanceApiDocumentation()
  async plusWalletBalance(
    @Query('walletId') walletId: string,
    @Query('token') token: string,
    @Query('value') value: number,
  ) {
    return await this.walletService.plusBalance(walletId, token, value);
  }

  @Patch('/minus-balance')
  @MinusWalletBalanceApiDocumentation()
  async minusWalletBalance(
    @Query('walletId') walletId: string,
    @Query('token') token: string,
    @Query('value') value: number,
  ) {
    return await this.walletService.minusBalance(walletId, token, value);
  }
}
