import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SignInDto {
  @ApiProperty({
    example: 'test@gmail.com',
  })
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '123456789',
  })
  @IsNotEmpty()
  password: string;
}
