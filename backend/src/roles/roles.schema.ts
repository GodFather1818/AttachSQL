import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Roles extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ type: Map, of: Boolean, default: { CREATE: false, READ: false, UPDATE: false, DELETE: false } })
  Category: Record<'CREATE' | 'READ' | 'UPDATE' | 'DELETE', boolean>;

  @Prop({ type: Map, of: Boolean, default: { CREATE: false, READ: false, UPDATE: false, DELETE: false } })
  Products: Record<'CREATE' | 'READ' | 'UPDATE' | 'DELETE', boolean>;

  @Prop({ type: Map, of: Boolean, default: { CREATE: false, READ: false, UPDATE: false, DELETE: false } })
  Projects: Record<'CREATE' | 'READ' | 'UPDATE' | 'DELETE', boolean>;

  @Prop({ type: Map, of: Boolean, default: { CREATE: false, READ: false, UPDATE: false, DELETE: false } })
  Tasks: Record<'CREATE' | 'READ' | 'UPDATE' | 'DELETE', boolean>;
}

export const RolesSchema = SchemaFactory.createForClass(Roles);
