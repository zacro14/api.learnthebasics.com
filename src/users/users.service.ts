import { Injectable } from '@nestjs/common';

type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      user_id: 1,
      username: 'junel',
      password: 'Iknowyou',
    },
  ];

  async findone(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
