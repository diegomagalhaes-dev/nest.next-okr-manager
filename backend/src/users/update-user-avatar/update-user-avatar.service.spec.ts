import { Test, TestingModule } from '@nestjs/testing';
import { UpdateUserAvatarService } from './update-user-avatar.service';

describe('UpdateUserAvatarService', () => {
  let service: UpdateUserAvatarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateUserAvatarService],
    }).compile();

    service = module.get<UpdateUserAvatarService>(UpdateUserAvatarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
