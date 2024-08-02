import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.schema';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}


    @Get()
    getProducts(): Promise<Product[]> {
        return this.productService.findAll();
    }
}
