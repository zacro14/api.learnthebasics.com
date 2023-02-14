import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma.service';

@Injectable()
export class LessonService {
  constructor(private prisma: PrismaService) {}

  async createLesson() {
    return 'lesson';
  }
}
