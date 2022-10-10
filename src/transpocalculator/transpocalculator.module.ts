import { Module } from '@nestjs/common';
import { CalculateTranspo } from './transpocalculator.controller';
import { TranspocalculatorService } from './transpocalculator.service';

@Module({
  controllers: [CalculateTranspo],
  providers: [TranspocalculatorService],
})
export class TranspocalculatorModule {}
