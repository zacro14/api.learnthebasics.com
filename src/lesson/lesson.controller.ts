import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { createLessonDto } from './dto/create-lesson.dto';
import { LessonService } from './lesson.service';

@Controller('lesson')
export class LessonController {
  constructor(private lessonService: LessonService) {}

  @UseGuards(AccessTokenGuard)
  @Post()
  async createLesson(@Body() lessonData: createLessonDto): Promise<any> {
    const lesson = await this.lessonService.createLesson(lessonData);

    if (!lesson) {
      throw new BadRequestException('Please submit a valid properties');
    }

    return lesson;
  }
}
