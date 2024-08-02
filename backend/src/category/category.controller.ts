import { Controller, Get } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './category.schema';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get("/api")
  getCategories(): Promise<Category[]> {
    return this.categoryService.getCategories();
  }
}
