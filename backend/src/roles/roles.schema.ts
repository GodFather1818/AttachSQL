import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

class Permissions {
  @Prop({ required: true ,default:false})
  CREATE: boolean;

  @Prop({ required: true,default:true })
  READ: boolean;

  @Prop({ required: true,default:false })
  UPDATE: boolean;

  @Prop({ required: true ,default:false })
  DELETE: boolean;
}

@Schema()
export class Roles extends Document {
  @Prop({ required: true,default:'user' })
  name: string;

  @Prop({type: Permissions, required: true })
  category: Permissions;

  @Prop({ type: Permissions, required: true })
  products: Permissions;

  @Prop({ type: Permissions, required: true })
  projects: Permissions;

  @Prop({ type: Permissions, required: true })
  tasks: Permissions;
}

export const RolesSchema = SchemaFactory.createForClass(Roles);