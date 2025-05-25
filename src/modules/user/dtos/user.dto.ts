import { IsString, MaxLength, MinLength, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: '帳號',
    example: 'qwe123',
    minLength: 4,
    maxLength: 20,
  })
  @IsString({ message: '帳號必須是字串' })
  @MinLength(4, { message: '帳號長度不能小於 4 個字符' })
  @MaxLength(20, { message: '帳號長度不能超過 20 個字符' })
  @IsNotEmpty({ message: '帳號不能為空' })
  username: string;

  @ApiProperty({
    description: '密碼',
    example: '123456',
    minLength: 6,
    maxLength: 20,
  })
  @IsString({ message: '密碼必須是字串' })
  @MinLength(6, { message: '密碼長度不能小於 6 個字符' })
  @MaxLength(20, { message: '密碼長度不能超過 20 個字符' })
  @IsNotEmpty({ message: '密碼不能為空' })
  password: string;

  @ApiProperty({
    description: '暱稱',
    example: 'John Doe',
    minLength: 2,
    maxLength: 20,
  })
  @IsString({ message: '暱稱必須是字串' })
  @MinLength(2, { message: '暱稱長度不能小於 2 個字符' })
  @MaxLength(20, { message: '暱稱長度不能超過 20 個字符' })
  @IsNotEmpty({ message: '暱稱不能為空' })
  nickname: string;
}

export class LoginDto {
  @ApiProperty({ description: '使用者帳號', example: 'qwe1234' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ description: '使用者密碼', example: 'password123' })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class LoginResponseDto {
  @ApiProperty({
    description: '使用者 ID',
    example: '681ee68eacdbafe5ec1564c9',
  })
  userId: string;

  @ApiProperty({ description: '使用者帳號', example: 'qwe123' })
  username: string;

  @ApiProperty({ description: '使用者暱稱', example: 'John Doe' })
  nickname: string;

  @ApiProperty({
    description: 'JWT token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFt',
  })
  token: string;
}
