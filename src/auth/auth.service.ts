// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as argon2 from 'argon2';
import { ConfigService } from '@nestjs/config';
import { CreatUserDto } from 'src/users/dto/create-user.dto';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signup(createUserDto: CreatUserDto): Promise<any> {
    const userExists = await this.userService.findByUsername(
      createUserDto.username,
    );
    if (userExists) {
      throw new BadRequestException('user already exist');
    }

    const hash = await this.hashData(createUserDto.password);
    const newUser = await this.userService.createUser({
      ...createUserDto,
      password: hash,
    });
    if (newUser === 'P2002') {
      throw new BadRequestException(
        'There is a unique constraint violation, a new user cannot be created with this email',
      );
    }

    if (newUser) {
      const tokens = await this.getTokens(
        newUser.id,
        newUser.username,
        newUser.role,
      );
      await this.updateRefreshToken(newUser.id, tokens.refreshToken);
      return tokens;
    }

    throw new BadRequestException(
      'new user cannot be created please try again',
    );
  }

  async signin(data: AuthDto) {
    const user = await this.validateUser(data.username, data.password);
    if (!user) {
      throw new BadRequestException('Invalid username or password');
    }

    const tokens = await this.getTokens(user.id, user.username, user.role);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return {
      ...tokens,
      user: { id: user.id, username: user.username, role: user.role },
    };
  }

  async logout(userId: string) {
    return this.userService.update(userId, { refreshToken: null });
  }

  async refreshToken(userId: string, refreshToken: string) {
    const user = await this.userService.getUserById(userId);
    if (!user || !user.refreshToken) {
      throw new ForbiddenException();
    }
    const refreshTokenMatch = await argon2.verify(
      user.refreshToken,
      refreshToken,
    );

    if (!refreshTokenMatch) {
      throw new ForbiddenException();
    }

    const tokens = await this.getTokens(user.id, user.username, user.role);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  hashData(data: string) {
    return argon2.hash(data);
  }

  async getTokens(userId: string, username: string, role: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
          role,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: '30m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
          role,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: '30d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.userService.update(userId, { refreshToken: hashedRefreshToken });
  }

  async validateUser(usernameOrEmail: string, pass: string): Promise<any> {
    const userFromUserName = await this.userService.findByUsername(
      usernameOrEmail,
    );
    const userFromEmail = await this.userService.findByEmail(usernameOrEmail);

    const user = userFromEmail || userFromUserName;
    if (user && (await argon2.verify(user.password, pass))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
