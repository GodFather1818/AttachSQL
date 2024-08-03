import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


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

    @Prop({required:true})
    assigned_to: string[];

    @Prop({ required: true })
    companyName: string;

    @Prop({ required: true })
    contactName: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
