import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    description: '標題',
    example: '這是一篇測試文章',
    required: true,
    maxLength: 20,
  })
  @IsNotEmpty({ message: '標題不能為空' })
  @MaxLength(20, { message: '標題最多20個字' })
  title: string;

  @ApiProperty({
    description: '內容',
    example: '這是文章的內容...',
    required: true,
    maxLength: 200,
  })
  @IsNotEmpty({ message: '內容不能為空' })
  @MaxLength(200, { message: '內容最多200個字' })
  content: string;
}

export class PostResponseDto {
  @ApiProperty({
    description: '文章 ID',
    example: '681f5b8335343d550758a305',
  })
  id: string;

  @ApiProperty({
    description: '文章標題',
    example: '貓咪大戰爭',
  })
  title: string;

  @ApiProperty({
    description: '文章內容',
    example: '六週年大優惠',
  })
  content: string;

  @ApiProperty({
    description: '創建時間',
    example: '2025-05-10T13:58:27.121Z',
  })
  createTime: string;
}

export class CreatePostResponseDto extends PostResponseDto {}

export class UserInfoDto {
  @ApiProperty({
    description: '使用者 ID',
    example: '681ee68eacdbafe5ec1564c9',
  })
  id: string;

  @ApiProperty({
    description: '使用者帳號',
    example: 'd15555ss',
  })
  username: string;

  @ApiProperty({
    description: '使用者暱稱',
    example: '鰻魚燒',
  })
  nickname: string;
}
export class ListPostDto extends PostResponseDto {
  user: UserInfoDto;
}
