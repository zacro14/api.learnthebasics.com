import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreatUserDto {
  @IsNotEmpty({ message: '[firstname] field should not be empty' })
  firstname: string;

  @IsNotEmpty({ message: '[lastname] field should not be empty' })
  lastname: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  username: string;
  refreshToken: string;
}
