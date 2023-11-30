import { Body, Controller, Get, Param, Post, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from '../services.ts/index.js';
import {
  CreateNewUserApiDocumentation,
  LoginUserApiDocumentation,
} from '../swagger/auth-api-doc-decorator.js';

@ApiTags('User')
@Controller('/user')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @CreateNewUserApiDocumentation()
  @Post('/sign-up')
  async createUser(@Body() newUser) {
    return await this.authService.create(newUser);
  }

  @LoginUserApiDocumentation()
  @Post('/sign-in')
  async getUser(@Body() user: any): Promise<any> {
    return await this.authService.getUser(user);
  }

  @Get('/:id')
  async findUser(@Param('id') id: string) {
    return await this.authService.findById(id);
  }

  @Get('/token/:token')
  async findUserByToken(@Param('token') token: string) {
    return await this.authService.findByToken(token);
  }
}
