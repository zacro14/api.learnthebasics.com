import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma.service';
import { LessonCategory, Prisma } from '@prisma/client';
import { CreateCategoryDto } from './dto/create-lesson-category.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async createLessonCategory(
    createLessonCategory: CreateCategoryDto,
  ): Promise<LessonCategory> {
    try {
      const category = await this.prisma.lessonCategory.create({
        data: {
          ...createLessonCategory,
        },
      });

      return category;
    } catch (error) {
      return error;
    }
  }
}
