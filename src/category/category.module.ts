import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/common/guards/role.guard';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

@Module({
  controllers: [CategoryController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    CategoryService,
  ],
})
export class CategoryModule {}
