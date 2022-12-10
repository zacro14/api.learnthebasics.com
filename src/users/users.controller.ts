import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { CreatUserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('user')
export class UserController {
  constructor(private user: UsersService) {}

  @Get()
  async getUsers(): Promise<any> {
    return 'hello users';
  }

  @Post()
  async createUser(@Body() createUser: CreatUserDto) {
    try {
      console.log(createUser);
      const user = await this.user.createUser(createUser);
      return user;

      // return {
      //   success: true,
      //   message: 'user created successfully',
      // };
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Cannot create user');
    }
  }
}
