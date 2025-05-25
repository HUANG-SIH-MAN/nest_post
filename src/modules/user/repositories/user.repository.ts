import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import { User, UserDocument } from '../../../schemas/user.schema';
import { CreateUserDto } from '../dtos/user.dto';
@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findUserByUsername(username: string): Promise<User> {
    return this.userModel.findOne({ username });
  }

  async create(user: CreateUserDto): Promise<User> {
    return this.userModel.create(user);
  }

  async getUserMap(userIds: ObjectId[]): Promise<Map<string, User>> {
    const userMap = new Map<string, User>();
    const users = await this.userModel.find({ _id: { $in: userIds } });
    users.forEach((user) => {
      userMap.set(user._id.toString(), user);
    });
    return userMap;
  }
}
