import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Product } from './product.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProductService {
    constructor(@InjectModel(Product.name) private productModel: Model<Product>){}
    get() {
        return 'Hello World!'
    }
    async findAll(): Promise<Product[]> {
        return this.productModel.find().exec();
    }
}
