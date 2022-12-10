import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as argon2 from 'argon2';
import { PrismaService } from 'prisma.service';
import { CreatUserDto } from './dto/user.dto';

type User = any;

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  private readonly users = [
    {
      user_id: 1,
      username: 'junel',
      password: 'Iknowyou',
    },
    {
      user_id: 2,
      username: 'sacro',
      password: 'junel',
    },
  ];

  async user(userUniqueId: Prisma.UserWhereUniqueInput): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userUniqueId,
    });
  }

  async findone(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }

  async createUser(userData: CreatUserDto): Promise<any> {
    try {
      const { password, email, firstname, lastname } = userData;
      const hash = await argon2.hash(password);
      if (hash) {
        const user = await this.prisma.user.create({
          data: {
            email,
            password: hash,
            firstname,
            lastname,
          },
        });

        return user;
      }
    } catch (error) {}
  }
}
