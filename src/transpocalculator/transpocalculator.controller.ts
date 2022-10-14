import { Body, Controller, Get, Post } from '@nestjs/common';
import { CalculatorDto } from './dto/calculator.dto';
import { CalculateResult } from './interfaces/calculator.interface';
import { TranspocalculatorService } from './transpocalculator.service';

@Controller('calculate')
export class CalculateTranspo {
  constructor(private calculateTranspo: TranspocalculatorService) {}

  @Get('hello')
  greet() {
    return this.calculateTranspo.calaculate();
  }
  @Post()
  calculate(@Body() calculate: CalculatorDto): CalculateResult {
    return this.calculateTranspo.calculateTranspo(calculate);
  }
}
