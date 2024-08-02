import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Product extends Document {
  @Prop({ unique: true, default: () => new Types.ObjectId().toString() })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, type: Types.Decimal128 })
  sellingPrice: number;

  @Prop({ required: true, type: Types.Decimal128 })
  actualPrice: number;

  @Prop([String])
  Tags: string[];

  @Prop({ required: true })
  bannerImage: string;

  @Prop([String])
  images: string[];

  @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
  category: Types.ObjectId;

  @Prop([String])
  history: string[];

  @Prop({ default: false })
  isArchived: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
