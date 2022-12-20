import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { UserQueryDto } from './dto/query-dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('user')
export class UserController {
  constructor(private user: UsersService) {}

  @UseGuards(AccessTokenGuard)
  @Get()
  async getUserbyQuery(@Query() query: UserQueryDto) {
    const user = await this.user.getUserById(query.id);
    console.log('query', query);
    if (user) {
      return user;
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  @UseGuards(AccessTokenGuard)
  @Get(':id')
  async getUsers(@Param() params) {
    const user = await this.user.getUserById(params.id);
    console.log(user);
    if (user) {
      return user;
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.user.update(id, updateUserDto);
  }
}
