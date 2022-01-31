import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { getRepository } from 'typeorm';

import { promises } from 'fs';
import { join } from 'path';
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

    if (!user) {
      throw new HttpException(
        'Only authenticated users can change avatar.',
        HttpStatus.FORBIDDEN,
      );
    }

    if (user.avatar) {
      const userAvatarFilePath = join('./tmp', user.avatar);

      const userAvatarFileExists = await promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await promises.unlink(userAvatarFilePath);
      }
    }
    user.avatar = avatarFilename;

    await userRepository.save(user);
    return user;
  }
}
