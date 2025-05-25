import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dtos/user.dto';
import { UserRepository } from './repositories/user.repository';
import * as jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET || 'your-secret-key';
@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    const { username, password, nickname } = createUserDto;
    const existingUser = await this.userRepo.findUserByUsername(username);
    if (existingUser) {
      throw new UnauthorizedException('帳號已存在');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await this.userRepo.create({
      username,
      password: hashedPassword,
      nickname,
    });

    return;
  }

  async validateUser(username: string, password: string) {
    const user = await this.userRepo.findUserByUsername(username);
    if (!user) {
      throw new UnauthorizedException('帳號不存在');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('密碼錯誤');
    }

    return user;
  }

  async generateToken(user: { username: string; userId: string }) {
    const payload = { username: user.username, userId: user.userId };
    return jwt.sign(payload, secretKey, { expiresIn: '24h' });
  }
}
