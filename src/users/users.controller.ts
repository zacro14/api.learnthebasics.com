import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  Post,
} from '@nestjs/common';
import { CreatUserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('user')
export class UserController {
  constructor(private user: UsersService) {}

  @Get(':id')
  async getUsers(@Param() params) {
    try {
      const user = this.user.getUser(params.id);
      if (user) {
        return user;
      }
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    } catch (error) {
      Logger.error(error);
    }
  }

  @Post()
  async createUser(@Body() createUser: CreatUserDto) {
    try {
      const user = await this.user.createUser(createUser);
      if (user) {
        return {
          success: true,
          message: 'user created successfully',
        };
      } else {
        throw new BadRequestException('Cannot create user');
      }
    } catch (error) {
      Logger.error(error);
    }
  }
}
