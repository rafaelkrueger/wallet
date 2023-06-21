import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiUnauthorizedResponse,
  ApiCreatedResponse,
  ApiBody,
} from '@nestjs/swagger';
import { UserDto } from '../schemas';
import { SignInDto } from '../dto/auth-login';

export const CreateNewUserApiDocumentation = () => {
  return applyDecorators(
    ApiBody({
      type: UserDto,
      required: true,
    }),
    ApiOperation({
      summary: 'Creates new User.',
    }),
    ApiCreatedResponse({
      description: 'New user created.',
    }),
    ApiUnauthorizedResponse({ description: 'Unauthorized.' }),
  );
};

export const LoginUserApiDocumentation = () => {
  return applyDecorators(
    ApiBody({
      type: SignInDto,
      required: true,
    }),
    ApiOperation({
      summary: 'Logs the User.',
    }),
    ApiCreatedResponse({
      description: 'User Logged in!.',
    }),
    ApiUnauthorizedResponse({ description: 'Unauthorized.' }),
  );
};
