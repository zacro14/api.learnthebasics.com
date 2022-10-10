import { Module } from '@nestjs/common';
import { TranspocalculatorModule } from './transpocalculator/transpocalculator.module';

@Module({
  imports: [TranspocalculatorModule],
})
export class AppModule {}
