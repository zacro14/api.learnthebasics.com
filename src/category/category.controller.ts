import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { RolesGuard } from 'src/common/guards/role.guard';
import { Role } from 'src/common/role/role.enum';
import { Roles } from 'src/decorators/role.decorators';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-lesson-category.dto';
@UseGuards(AccessTokenGuard, RolesGuard)
@Controller('category')
export class CategoryController {
  constructor(private category: CategoryService) {}

  @Post('create')
  @Roles(Role.ADMIN)
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<any> {
    return createCategoryDto;
  }
}
