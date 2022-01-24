import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getUser(): Record<string, unknown> {
    return {
      name: 'Diêgo',
      idade: 21,
      profissao: 'Software Engeenir',
    };
  }
}
