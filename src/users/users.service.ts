import { Injectable, NotFoundException } from '@nestjs/common';
import * as argon2 from 'argon2';
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
      const { password, email, firstname, lastname, username } = userData;
      const hash = await argon2.hash(password);
      if (hash) {
        const user = await this.prisma.user.create({
          data: {
            email,
            password: hash,
            firstname,
            lastname,
            username,
          },
        });

        return user;
      }
    } catch (error) {}
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<any> {
    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        ...updateUserDto,
      },
    });
  }
}
