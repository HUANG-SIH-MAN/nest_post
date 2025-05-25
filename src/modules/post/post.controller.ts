import {
  Controller,
  Get,
  Req,
  Query,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { Request } from 'express';
import { PostService } from './post.service';
import {
  ListPostDto,
  CreatePostDto,
  CreatePostResponseDto,
} from './dtos/post.dto';
import { AuthGuard } from 'src/common/gurd/auth.guard';
import { PaginationDto } from 'src/common/dtos/swagger.dto';

@ApiTags('post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('list')
  @ApiOperation({ summary: '取得文章列表' })
  @ApiOkResponse({ description: '文章列表', type: [ListPostDto] })
  async list(@Req() req: Request, @Query() query: PaginationDto) {
    return this.postService.list(query.page, query.pageSize);
  }

  @Post('')
  @ApiOperation({ summary: '新增文章' })
  @ApiOkResponse({ description: '新增文章', type: CreatePostResponseDto })
  @UseGuards(AuthGuard)
  async create(@Req() req: Request, @Body() body: CreatePostDto) {
    const user = req.user as { userId: string };
    return this.postService.create(user.userId, body);
  }
}
