import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dtos/post.dto';
import { PostRepository } from './repositories/post.repository';
import { UserRepository } from '../user/repositories/user.repository';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async list(page: number, pageSize: number) {
    const skip = (page - 1) * pageSize;
    const posts = await this.postRepository.findPosts(skip, pageSize);
    const userIds = posts.map((post) => post.userId);
    const userMap = await this.userRepository.getUserMap(userIds);
    return posts.map((post) => {
      const user = userMap.get(post.userId.toString());
      return {
        id: post._id,
        title: post.title,
        content: post.content,
        createTime: post.createTime,
        user: {
          id: user._id,
          username: user.username,
          nickname: user.nickname,
        },
      };
    });
  }

  async create(userId: string, body: CreatePostDto) {
    const post = await this.postRepository.createPost({ userId, ...body });
    return {
      id: post._id,
      title: post.title,
      content: post.content,
      createTime: post.createTime,
    };
  }
}
