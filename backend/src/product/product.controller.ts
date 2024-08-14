import {
  Get,
  Controller,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
  Delete,
  Param,
  Put,
  UseGuards,
  Request,
  ForbiddenException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductService } from './product.service';
import { CreateProductDto } from '../dto/product.dto';
import { Product } from './product.schema';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/user/roles.decorator';
import { UserRole } from 'src/models/users.models';
import { CloudinaryService } from '../cloudinary/cloudinary.service'; // Import Cloudinary service

@ApiTags('Product Module')
@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly cloudinaryService: CloudinaryService, // Inject Cloudinary service
  ) {}

  @Get('/api/')
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({
    status: 200,
    description: 'Get all products',
    schema: {
      example: [
        {
          id: '123',
          name: 'Product Name',
          description: 'Product Description',
          Sellingprice: 100,
          Actualprice: 50,
          Tags: ['user1', 'user2'],
          category: 'Obj584515487',
          bannerImage: 'uploads/bannerImage-123456789.jpg',
        },
      ],
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Products not found',
  })
  getProducts(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get('/api/get/:id')
  @ApiOperation({ summary: 'Get a product by ID' })
  @ApiResponse({
    status: 200,
    description: 'Get a product by ID',
    schema: {
      example: {
        id: '123',
        name: 'Product Name',
        description: 'Product Description',
        Sellingprice: 100,
        Actualprice: 50,
        Tags: ['user1', 'user2'],
        category: 'Obj584515487',
        bannerImage: 'uploads/bannerImage-123456789.jpg',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Product not found',
  })
  getProduct(@Param('id') id: string): Promise<Product> {
    return this.productService.findOne(id);
  }


@Put('/api/update/:id')
@Roles(UserRole.ADMIN)
@ApiOperation({ summary: 'Update a product by ID' })
@ApiResponse({
  status: 200,
  description: 'Product successfully updated',
  schema: {
    example: {
      id: '123',
      name: 'Updated Product',
      description: 'Updated Product Description',
      price: 150,
      bannerImage: 'uploads/bannerImage-987654321.jpg',
    },
  },
})
@ApiResponse({
  status: 400,
  description: 'Invalid input',
})
@UseInterceptors(FileInterceptor('bannerImage'))
async updateProduct(
  @Param('id') id: string,
  @Body() updateProductDto: any,
  @UploadedFile() file: Express.Multer.File,
): Promise<Product> {
  let imagePath = updateProductDto.bannerImage; // Default to existing image path
  if (file) {
    const result = await this.cloudinaryService.uploadImage(file);
    imagePath = result.secure_url; // Get the secure URL from Cloudinary response
  }
  return await this.productService.updateProduct(id, updateProductDto, imagePath);
}



  @Post('/api/add')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Add a new product' })
  @ApiResponse({
    status: 201,
    description: 'Product successfully created',
    schema: {
      example: {
        id: '123',
        name: 'New Product',
        description: 'New Product Description',
        price: 100,
        bannerImage: 'uploads/bannerImage-123456789.jpg',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input',
  })
  @UseInterceptors(FileInterceptor('bannerImage'))
  async addProduct(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log(file);
    const result = await this.cloudinaryService.uploadImage(file);
    const imagePath = result.secure_url; // Get the secure URL from Cloudinary response
    return await this.productService.createProduct(createProductDto, imagePath);
  }

  @Delete('/api/delete/:id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Delete a product by ID' })
  @ApiResponse({
    status: 200,
    description: 'Product successfully deleted',
  })
  @ApiResponse({
    status: 404,
    description: 'Product not found',
  })
  async deleteProduct(@Param('id') id: string): Promise<Product> {
    return await this.productService.deleteProduct(id);
  }
}
