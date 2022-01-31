import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { getRepository } from 'typeorm';

import fs from 'fs';
import path from 'path';
import User from '../../models/user.entity';
interface Request {
  user_id: string;
  avatarFilename: string;
}

@Injectable()
export class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(user_id);
    console.log(user);

    if (!user) {
      throw new HttpException(
        'Only authenticated users can change avatar.',
        HttpStatus.FORBIDDEN,
      );
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join('./tmp', user.avatar);

      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }
    user.avatar = avatarFilename;

    await userRepository.save(user);
    return user;
  }
}
