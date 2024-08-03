import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";



@Schema()
export class Project extends Document{
    @Prop({required: true})
    name: string;

    @Prop({type: [{type: Types.ObjectId, ref: "Task"}]})
    tasks: Types.ObjectId[];

}

export const ProjectSchema = SchemaFactory.createForClass(Project);