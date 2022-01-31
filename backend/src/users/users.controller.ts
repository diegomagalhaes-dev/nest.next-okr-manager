import {
  Controller,
  Post,
  Body,
  Patch,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  HttpException,
  HttpStatus,
  Request,
} from '@nestjs/common';
import { Express } from 'express';

import { FileInterceptor } from '@nestjs/platform-express';

import { SampleDto } from './dto/uploadFile.dto';
import { CreateUserService } from './create-user/create-user.service';
import { storage } from '../config/upload';
import { JwtAuthGuard } from '../auth/auth/guards/auth.guard';
import { CreateUserDto } from './dto/users.dto';
import { UpdateUserAvatarService } from './update-user-avatar/update-user-avatar.service';
import { AuthUser } from 'src/decorators/user.decorator';

@Controller('users')
export class UsersController {
  @Post()
  async signUp(@Body() body: CreateUserDto) {
    const { name, email, password } = body;

    const createUser = new CreateUserService();

    const returnedUser = await createUser.execute({
      name,
      email,
      password,
    });

    const user = { ...returnedUser, password: undefined };

    return { user };
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('avatar', storage))
  @Patch('file')
  async updateUserAvatar(
    @Body() body: SampleDto,
    @AuthUser() user_: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const updateAvatarUser = new UpdateUserAvatarService();

    if (!file) {
      throw new HttpException(
        'The image file is required',
        HttpStatus.FORBIDDEN,
      );
    }
    const _user = await updateAvatarUser.execute({
      user_id: user_.user.id,
      avatarFilename: body.avatar,
    });

    const user = { ..._user, password: undefined };
    return {
      user,
    };
  }
}
