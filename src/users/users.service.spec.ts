import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let userService: UsersService;

  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     providers: [UsersService],
  //   }).compile();

  //   service = module.get<UsersService>(UsersService);
  // });

  describe('get User', () => {
    it('should get user', async () => {
      const expectedUser = {};
      const username = 'june.2345';

      const user = await userService.findByUsername(username);
      expect(user).toEqual(expectedUser);
    });
  });
});
