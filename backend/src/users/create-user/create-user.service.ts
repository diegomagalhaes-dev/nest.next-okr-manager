import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { getRepository } from 'typeorm';
import { hash } from 'bcrypt';

import User from '../../models/user.entity';

interface Request {
  name: string;
  password: string;
  email: string;
}

@Injectable()
export class CreateUserService {
  public async execute({ name, password, email }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const checkUserExist = await usersRepository.findOne({
      where: { email },
    });

    if (checkUserExist) {
      throw new HttpException(
        'Email address already used.',
        HttpStatus.FORBIDDEN,
      );
    }

    const hashedPassword = await hash(password, 8);
    const user = usersRepository.create({
      name,
      password: hashedPassword,
      email,
    });

    await usersRepository.save(user);

    return user;
  }
}
