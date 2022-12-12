import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { CreatUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('user')
export class UserController {
  constructor(private user: UsersService) {}

  @UseGuards(AccessTokenGuard)
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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.user.update(id, updateUserDto);
  }

  // @Post()
  // async createUser(@Body() createUser: CreatUserDto) {
  //   try {
  //     const user = await this.user.createUser(createUser);
  //     if (user) {
  //       return {
  //         success: true,
  //         message: 'user created successfully',
  //       };
  //     } else {
  //       throw new BadRequestException('Cannot create user');
  //     }
  //   } catch (error) {
  //     Logger.error(error);
  //   }
  // }
}
