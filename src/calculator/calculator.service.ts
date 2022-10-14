import { Injectable } from '@nestjs/common';
import { IncentiveDto, TranpoDto } from './dto';

@Injectable()
export class CalculatorService {
  cumputeTranspo(data: TranpoDto) {
    const { amount, name, no_of_days } = data;
    const result = amount * (no_of_days || 1);

    return {
      amount: result,
      name: name,
      no_of_days: no_of_days,
      amount_per_day: amount,
    };
  }

  get13MonthPay(data: IncentiveDto) {
    console.log(data);
    return {
      amount: 'hello',
    };
  }
}
