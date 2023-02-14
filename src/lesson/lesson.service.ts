import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma.service';
import { createLessonDto } from './dto/create-lesson.dto';

@Injectable()
export class LessonService {
  constructor(private prisma: PrismaService) {}

  async createLesson(lessonData: createLessonDto): Promise<any> {
    return 'any';
  }
}
