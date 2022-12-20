import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma.service';
import { CreatUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findByUsername(userName: string): Promise<User> {
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

  async findByEmail(email: string): Promise<User | any> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, refreshToken, ...result } = user;
      return result;
    }
    return null;
  }

  async getUser(userUniqueId: string): Promise<User | any> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userUniqueId },
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, refreshToken, ...result } = user;
      return result;
    } catch (error) {
      return error;
    }
  }

  async createUser(userData: CreatUserDto): Promise<any> {
    try {
      const user = await this.prisma.user.create({
        data: {
          ...userData,
        },
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
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
      return error;
    }
  }
}
