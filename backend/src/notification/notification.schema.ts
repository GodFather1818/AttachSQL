// notification.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { User } from '../models/users.models';


@Schema({ timestamps: true })
export class Notification extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop({ required: true })
  message: string;

  @Prop({ default: false })
  read: boolean;

  @Prop({ type: String, required: true })
  type: string;

  @Prop({ type: Types.ObjectId, refPath: 'entityType' })
  entityId: Types.ObjectId;;

  @Prop({ type: String, enum: ['Task', 'Role'] })
  entityType: string;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);