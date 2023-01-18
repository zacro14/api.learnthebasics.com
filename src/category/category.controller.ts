import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { Role } from 'src/common/role/role.enum';
import { Roles } from 'src/decorators/role.decorators';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-lesson-category.dto';
@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  getCategories() {
    const res = this.categoryService.getAllLessonsCategory();
    if (!res) {
      throw new NotFoundException();
    }
    return res;
  }

  @UseGuards(AccessTokenGuard)
  @Post('create')
  @Roles(Role.ADMIN)
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<any> {
    const lessonCategory = await this.categoryService.createLessonCategory(
      createCategoryDto,
    );

    if (!lessonCategory) {
      throw new BadRequestException('Please submit a valid properties');
    }

    return lessonCategory;
  }

  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  @Roles(Role.ADMIN)
  async update(
    @Param('id') id: string,
    @Body() categoryDto: CreateCategoryDto,
  ): Promise<any> {
    const categoryResult = await this.categoryService.update(id, categoryDto);

    return categoryResult;
  }
}
