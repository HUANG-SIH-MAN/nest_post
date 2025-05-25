import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from '../../../schemas/post.schema';

@Injectable()
export class PostRepository {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async findPosts(skip: number, limit: number) {
    return this.postModel
      .find()
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .exec();
  }

  async createPost(post: { userId: string; title: string; content: string }) {
    return this.postModel.create(post);
  }
}
