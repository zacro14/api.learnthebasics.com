import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma.service';
import { CreatUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

type User = any;

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findByUsername(userName: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: {
        username: userName,
      },
    });

    if (user) {
      return user;
    }
    return null;
  }

  async getUser(userUniqueId: string): Promise<User | null> {
    try {
      return await this.prisma.user.findUnique({
        where: { id: userUniqueId },
      });
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async createUser(userData: CreatUserDto): Promise<any> {
    try {
      const user = await this.prisma.user.create({
        data: {
          ...userData,
        },
      });
      return user;
    } catch (error) {
      if (error.code === 'P2002') {
        return error.code;
      }
      return error;
    }
  }

  async update(userId: string, updateUserDto: UpdateUserDto): Promise<any> {
    try {
      return await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          ...updateUserDto,
        },
      });
    } catch (error) {
      Logger.error(error);
      return error;
    }
  }
}
