import { Injectable } from '@nestjs/common';

@Injectable()
export class TranspocalculatorService {
  calaculate() {
    return {
      message: 'Hello Junel',
    };
  }

  greet() {
    return { value: 100 };
  }
}
