import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { CreateUserService } from './create-user/create-user.service';
import { UpdateUserAvatarService } from './update-user-avatar/update-user-avatar.service';

@Module({
  controllers: [UsersController],
  providers: [CreateUserService, UpdateUserAvatarService],
})
export class UsersModule {}
