import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma.service';
import { UserController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UserController],
  providers: [UsersService, PrismaService],
  exports: [UsersService],
})
export class UsersModule {}
