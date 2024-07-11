import { HttpException, HttpStatus } from '@nestjs/common';

export class UserTokenNotFoundException extends HttpException {
  constructor() {
    super(
      `User not found by token. Sign in to get the correct token`,
      HttpStatus.NOT_FOUND,
    );
  }
}
