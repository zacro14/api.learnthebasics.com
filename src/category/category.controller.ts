import { Controller, Post } from '@nestjs/common';
import { Role } from 'src/common/role/role.enum';
import { Roles } from 'src/decorators/role.decorators';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-lesson-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private category: CategoryService) {}

  @Post('create')
  @Roles(Role.ADMIN)
  createCategory(createCategoryDto: CreateCategoryDto): string {
    return `${createCategoryDto}`;
  }
}
