import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";



export enum UserRole{
    ADMIN = 'admin',
    USER = 'user',
}

@Schema({timestamps: true})
export class User extends Document {

    @Prop({required: true, trim: true})
    name: string

    @Prop({required: true, trim: true, lowercase: true, unique: true})
    email: string

    @Prop({required: true, trim: true})
    password: string

    @Prop({enum: UserRole, default:UserRole.USER})
    role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);

