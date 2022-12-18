import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;

  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     providers: [AuthService],
  //   }).compile();

  //   service = module.get<AuthService>(AuthService);
  // });

  describe('signin', () => {
    it('should get accesstoken', async () => {
      const expectedGpa = 3.8;
      const username = 'june.2345';
      const password = 'password';
      const gpa = await authService.signin({ username, password });
      expect(gpa).toEqual(expectedGpa);
    });
  });
});
