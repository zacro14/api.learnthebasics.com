import { IsNotEmpty, IsString } from 'class-validator';

export class createLessonDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  subject: string;

  @IsNotEmpty()
  content: any;
}
