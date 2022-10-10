import { Injectable } from '@nestjs/common';

@Injectable()
export class TrasnpocalculatorService {
  calaculate() {
    return {
      message: 'Hello Junel',
    };
  }

  greet() {
    return { value: 100 };
  }
}
