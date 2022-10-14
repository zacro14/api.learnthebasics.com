import { Injectable } from '@nestjs/common';
import { CalculatorDto } from './dto/calculator.dto';

@Injectable()
export class TranspocalculatorService {
  calaculate() {
    return {
      message: 'Hello Junel',
    };
  }
  calculateTranspo(data: CalculatorDto) {
    const { amount, name, no_of_days } = data;
    const result = amount * (no_of_days || 1);

    return {
      amount: result,
      name: name,
      no_of_days: no_of_days,
      amount_per_day: amount,
    };
  }
}
