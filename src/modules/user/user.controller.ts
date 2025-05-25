import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { CreateUserDto, LoginDto, LoginResponseDto } from './dtos/user.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '註冊新用戶' })
  @ApiResponse({ status: 201, description: '註冊成功' })
  @ApiResponse({ status: 400, description: '請求參數錯誤' })
  @ApiResponse({ status: 401, description: '帳號已存在' })
  @Post('signup')
  async register(@Body() createUserDto: CreateUserDto) {
    await this.userService.create(createUserDto);
    return;
  }

  @ApiOperation({ summary: '使用者登入' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: '登入成功', type: LoginResponseDto })
  @ApiResponse({ status: 401, description: '帳號或密碼錯誤' })
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    const token = await this.userService.generateToken(req.user);
    return { ...req.user, token };
  }
}
