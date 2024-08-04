import { Controller, Get ,Post, Body, Delete, Param, Put } from '@nestjs/common';
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
  @Get("/api/:id")
  getCategoryById(@Param('id') id: string): Promise<Category> {
    return this.categoryService.getCategoryById(id);
  }

  @Post("/api/add")
  addCategory(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoryService.addCategory(createCategoryDto);
  }
  @Put("/api/update/:id")
  updateCategory(@Param('id') id: string, @Body() updateData: Partial<Category>): Promise<Category> {
    return this.categoryService.updateCategory(id, updateData);
  }
  @Delete("/api/delete/:id")
  deleteCategory(@Param('id') id: string): Promise<Category> {
    return this.categoryService.deleteCategory(id);
  }
  
}
