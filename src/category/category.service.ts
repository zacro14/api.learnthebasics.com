import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma.service';
import { LessonCategory } from '@prisma/client';
import { CreateCategoryDto } from './dto/create-lesson-category.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async createLessonCategory(
    createLessonCategory: CreateCategoryDto,
  ): Promise<LessonCategory | null> {
    try {
      const category = await this.prisma.lessonCategory.create({
        data: {
          ...createLessonCategory,
        },
      });

      console.log('category', category);

      return category;
    } catch (error) {
      return error;
    }
  }
}
