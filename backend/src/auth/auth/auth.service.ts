import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  login(username: string, password: string): void {
    console.log(username, password);
  }
}
