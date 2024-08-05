import { Get, Controller, Post, Body, UploadedFile, UseInterceptors, Delete, Param } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { diskStorage } from 'multer';
import { extname } from 'path';
import { ProductService } from './product.service';
import { CreateProductDto } from '../dto/product.dto'
import { Product } from './product.schema';
@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}


    @Get("/api/")
    getProducts(): Promise<Product[]> {
        return this.productService.findAll();
    }
    @Post("/api/add")
    @UseInterceptors(
      FileInterceptor('bannerImage', {
        storage: diskStorage({
          destination: './uploads',
          filename: (req, file, callback) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            const ext = extname(file.originalname);
            callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
          },
        }),
      }),
    )
    async addProduct(
      @Body() createProductDto: CreateProductDto,
      @UploadedFile() file: Express.Multer.File,
    ) {
      const imagePath = file.path;
      return await this.productService.createProduct(createProductDto, imagePath);
    }
    @Delete('/api/delete/:id')
    async deleteProduct(@Param('id') id:string):Promise<Product>{
      return await this.productService.deleteProduct(id);
    }

}
