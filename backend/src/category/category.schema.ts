import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Category extends Document {
  @Prop({ unique: true, default: () => new Types.ObjectId().toString() })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Product' }] })
  products: Types.ObjectId[];

  @Prop({ type: Types.ObjectId, ref: 'Category' })
  parent: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Category' }] })
  subCategories: Types.ObjectId[];

  @Prop([String])
  history: string[];

  @Prop({ default: false })
  isArchived: boolean;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
