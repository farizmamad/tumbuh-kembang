import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { AuthErrorMessages } from './auth-error.messages';
import { LoginDto } from './dto/login.dto';
import { TokenDto } from './dto/token.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async login(loginDto: LoginDto): Promise<TokenDto> {
    const { username, password } = loginDto;
    const user = await this.usersService.findOneByUsername(username);
    if (!user) {
      throw new UnauthorizedException(AuthErrorMessages.INVALID_CREDENTIALS);
    }
    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException(AuthErrorMessages.INVALID_CREDENTIALS);
    }
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
