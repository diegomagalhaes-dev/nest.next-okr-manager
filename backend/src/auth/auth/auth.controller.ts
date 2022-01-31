import { Controller, Post, Body } from '@nestjs/common';

import { AuthService } from './auth.service';

type userCredentials = {
  email: string;
  password: string;
};

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sessions')
  async login(@Body() body: userCredentials) {
    const { email, password } = body;

    const { user: _user, token } = await this.authService.login({
      email,
      password,
    });

    const user = { ..._user, password: undefined };
    return { user, token };
  }
}
