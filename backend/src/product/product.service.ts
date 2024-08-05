import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Product } from './product.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProductDto } from '../dto/product.dto';
@Injectable()
export class ProductService {
    constructor(@InjectModel(Product.name) private productModel: Model<Product>){}
    get() {
        return 'Hello World!'
    }
    async findAll(): Promise<Product[]> {
        return this.productModel.find().exec();
    }
    async createProduct(createProductDto: CreateProductDto, imagePath: string): Promise<Product> {
        const newProduct = new this.productModel({
          ...createProductDto,
          bannerImage: imagePath,
        });
        return await newProduct.save();
      }
    async deleteProduct(categoryId:string):Promise<Product>{
        return this.productModel.findByIdAndDelete(categoryId).exec();
    }  
}
