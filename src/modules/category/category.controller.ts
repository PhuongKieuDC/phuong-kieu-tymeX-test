import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { CategoryEntity } from './category.entity';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private _categoryService: CategoryService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAll(): Promise<CategoryEntity[]> {
    return this._categoryService.getAll();
  }
}
