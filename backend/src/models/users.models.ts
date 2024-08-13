import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


export enum UserRole{
    ADMIN = 'admin',
    USER = 'user',
}

@Schema({timestamps: true})
export class User extends Document {

    @Prop({required: true, trim: true})
    name: string;

    @Prop({required: true, trim: true, lowercase: true, unique: true})
    email: string;

    @Prop({required: true, trim: true})
    password: string;

    @Prop({enum: UserRole, default:UserRole.USER})
    role: UserRole;

    
    @Prop({
      type: {
          read: { type: Boolean, default: true },
          write: { type: Boolean, default: false },
          create: { type: Boolean, default: false },
          delete: { type: Boolean, default: false },
      },
      default: {
          read: true,
          write: false,
          create: false,
          delete: false,
      }
  })
  permissions: {
      read: boolean;
      write: boolean;
      create: boolean;
      delete: boolean;
  };
}

export const UserSchema = SchemaFactory.createForClass(User);

