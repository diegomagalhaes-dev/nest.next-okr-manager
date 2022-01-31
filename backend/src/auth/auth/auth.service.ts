import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { getRepository } from 'typeorm';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import User from 'src/models/user.entity';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login({ email, password }: Request): Promise<Response> {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new HttpException(
        'Email or password is incorrect!',
        HttpStatus.FORBIDDEN,
      );
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new HttpException(
        'Email or password is incorrect!',
        HttpStatus.FORBIDDEN,
      );
    }

    const payload = {
      subject: user.id,
      email: user.email,
    };

    const token = this.jwtService.sign(payload);

    return {
      user,
      token,
    };
  }
}
