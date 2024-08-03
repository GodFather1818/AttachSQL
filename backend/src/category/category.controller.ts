import { Controller, Get ,Post, Body, Delete, Param } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './category.schema';
import { CreateCategoryDto } from '../dto/category.dto'
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get("/api")
  getCategories(): Promise<Category[]> {
    return this.categoryService.getCategories();
  }

  @Post("/api/add")
  addCategory(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoryService.addCategory(createCategoryDto);
  }
  @Delete("/api/delete/:id")
  deleteCategory(@Param('id') id: string): Promise<Category> {
    return this.categoryService.deleteCategory(id);
  }
  
}
