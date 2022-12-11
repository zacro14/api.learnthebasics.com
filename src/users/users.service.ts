import { Injectable, NotFoundException } from '@nestjs/common';
import * as argon2 from 'argon2';
import { PrismaService } from 'prisma.service';
import { CreatUserDto } from './dto/user.dto';

type User = any;

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

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
