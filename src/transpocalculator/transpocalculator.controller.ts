import { Controller, Get, Post } from '@nestjs/common';
import { TrasnpocalculatorService } from './transpocalculator.service';

@Controller('calculate')
export class CalculateTranspo {
  constructor(private calculateTranspo: TrasnpocalculatorService) {}

  @Get('hello')
  greet() {
    return this.calculateTranspo.calaculate();
  }
  @Post()
  calculate() {
    return this.calculateTranspo.greet();
  }
}
