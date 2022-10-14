import { IsNotEmpty, IsNumber } from 'class-validator';
export class IncentiveDto {
  @IsNotEmpty()
  @IsNumber()
  total_basic_pay: number;

  @IsNotEmpty()
  name: string;
}
