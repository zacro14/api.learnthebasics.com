import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma.service';
import { createLessonDto } from './dto/create-lesson.dto';

@Injectable()
export class LessonService {
  constructor(private prisma: PrismaService) {}

  async createLesson(lessonData: createLessonDto): Promise<any> {
    try {
      const lesson = await this.prisma.lesson.create({
        data: {
          ...lessonData,
        },
      });

      return lesson;
    } catch (error) {
      return error;
    }
  }
}
