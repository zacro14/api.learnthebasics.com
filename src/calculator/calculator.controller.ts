import { Body, Controller, Post } from '@nestjs/common';
import { CalculateResult } from './interfaces/calculator.interface';
import { IncentiveDto, TranpoDto } from './dto';
import { CalculatorService } from './calculator.service';

@Controller('calculator')
export class CalculatorController {
  constructor(private calculator: CalculatorService) {}

  @Post('transportation')
  calculateTranspo(@Body() transpo: TranpoDto): CalculateResult {
    return this.calculator.cumputeTranspo(transpo);
  }

  @Post('13month-pay')
  calculate(@Body() incentive: IncentiveDto) {
    return this.calculator.get13MonthPay(incentive);
  }
}
