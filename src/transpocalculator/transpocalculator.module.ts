import { Module } from '@nestjs/common';
import { CalculateTranspo } from './transpocalculator.controller';
import { TrasnpocalculatorService } from './transpocalculator.service';

@Module({
  controllers: [CalculateTranspo],
  providers: [TrasnpocalculatorService],
})
export class TranspocalculatorModule {}
