import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiUnauthorizedResponse,
  ApiCreatedResponse,
  ApiBody,
} from '@nestjs/swagger';
import { WalletDto } from '../schemas';

export const CreateWalletApiDocumentation = () => {
  return applyDecorators(
    ApiBody({
      type: WalletDto,
      required: true,
    }),
    ApiOperation({
      summary: 'Creates new Wallet.',
    }),
    ApiCreatedResponse({
      description: 'New wallet created.',
    }),
    ApiUnauthorizedResponse({ description: 'Unauthorized.' }),
  );
};

export const FindUserWalletsApiDocumentation = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Returns all user Wallets by userId.',
    }),
    ApiCreatedResponse({
      description: 'All wallet returned.',
    }),
    ApiUnauthorizedResponse({ description: 'Unauthorized.' }),
  );
};

export const ShareWalletWithUserApiDocumentation = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Share wallet using walletId and userId.',
    }),
    ApiCreatedResponse({
      description: 'Wallet Shared successfully.',
    }),
    ApiUnauthorizedResponse({ description: 'Unauthorized.' }),
  );
};


export const UpdateWalletBalanceApiDocumentation = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Update balance User wallet using toke, walletId and value.',
    }),
    ApiCreatedResponse({
      description: 'Wallet updated successfully.',
    }),
    ApiUnauthorizedResponse({ description: 'Unauthorized.' }),
  );
};

export const MinusWalletBalanceApiDocumentation = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Subtract balance User wallet using toke, walletId and value.',
    }),
    ApiCreatedResponse({
      description: 'Wallet updated successfully.',
    }),
    ApiUnauthorizedResponse({ description: 'Unauthorized.' }),
  );
};

export const PlusWalletBalanceApiDocumentation = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Add balance User wallet using toke, walletId and value.',
    }),
    ApiCreatedResponse({
      description: 'Wallet updated successfully.',
    }),
    ApiUnauthorizedResponse({ description: 'Unauthorized.' }),
  );
};

export const TotalBalanceApiDocumentation = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Returns all added user balance.',
    }),
    ApiCreatedResponse({
      description: 'Wallet returned successfullt.',
    }),
    ApiUnauthorizedResponse({ description: 'Unauthorized.' }),
  );
};

