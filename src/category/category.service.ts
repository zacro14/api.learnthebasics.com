import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma.service';
import { CreateCategoryDto } from './dto/create-lesson-category.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async createLessonCategory(
    createLessonCategory: CreateCategoryDto,
  ): Promise<any> {
    try {
      const category = await this.prisma.lessonCategory.create({
        data: {
          ...createLessonCategory,
        },
      });

      return category;
    } catch (e) {
      return e.code;
    }
  }

  async getAllLessonsCategory(): Promise<any> {
    return await this.prisma.lessonCategory.findMany();
  }

  async update(id: string, categoryDto: CreateCategoryDto): Promise<any> {
    try {
      return await this.prisma.lessonCategory.update({
        where: {
          id: id,
        },
        data: {
          ...categoryDto,
        },
      });
    } catch (error) {
      return error;
    }
  }

  async delete(catId: string): Promise<unknown> {
    try {
      return await this.prisma.lessonCategory.delete({
        where: {
          id: catId,
        },
      });
    } catch (error) {
      return error;
    }
  }
}
