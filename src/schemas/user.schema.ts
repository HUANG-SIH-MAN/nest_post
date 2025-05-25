import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  _id: Types.ObjectId;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, default: '' })
  nickname: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({ username: 1 }, { unique: true });
