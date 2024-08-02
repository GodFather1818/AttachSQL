import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Product extends Document {

    @Prop({required: true})
    name: string;

    @Prop({required: true})
    category: string;

    @Prop({required: true})
    price: number;

}


export const ProductSchema = SchemaFactory.createForClass(Product);

