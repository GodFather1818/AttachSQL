import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";
import { User } from "src/models/users.models";



@Schema({timestamps: true})
export class Task extends Document {
    
    @Prop({required: true})
    title: string;

    @Prop()
    description: string;

    @Prop({required: true})
    stage: string;
    
    @Prop({ required: true })
    due: Date;

    @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'User' }], required: true })
    assigned_to: User[];

    @Prop({ required: true })
    companyName: string;

    @Prop({ required: true })
    contactName: string;
}


export const TaskSchema = SchemaFactory.createForClass(Task);
