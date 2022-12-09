import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { PrismaService } from 'prisma.service';

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
}
