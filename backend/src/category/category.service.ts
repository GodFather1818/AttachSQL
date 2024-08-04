import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './category.schema';
import { CreateCategoryDto } from '../dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(@InjectModel(Category.name) private categoryModel: Model<Category>) {}

  async getCategories(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }
  async getCategoryById(categoryId: string): Promise<Category> {
    return this.categoryModel.findById(categoryId).exec();
  }

  async addCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const newCategory = new this.categoryModel(createCategoryDto);
    return newCategory.save();
  }
  async updateCategory(categoryId: string, updateData: Partial<Category>): Promise<Category> {
    return this.categoryModel.findByIdAndUpdate(categoryId, updateData, { new: true }).exec();
  }
  async deleteCategory(categoryId: string): Promise<Category> {
    return this.categoryModel.findByIdAndDelete(categoryId).exec();
  }

}