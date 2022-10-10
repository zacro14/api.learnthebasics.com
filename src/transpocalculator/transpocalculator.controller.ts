import { Controller, Get, Post } from '@nestjs/common';
import { TranspocalculatorService } from './transpocalculator.service';

@Controller('calculate')
export class CalculateTranspo {
  constructor(private calculateTranspo: TranspocalculatorService) {}

  @Get('hello')
  greet() {
    return this.calculateTranspo.calaculate();
  }
  @Post()
  calculate() {
    return this.calculateTranspo.greet();
  }
}
