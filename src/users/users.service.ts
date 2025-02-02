import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createSalt, hashPassword } from 'src/lib/password';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.usersRepository.findOneBy({ username: createUserDto.username });
    if (existingUser) {
      throw new ForbiddenException('Username: unavailable');
    }
    const salt = createSalt();
    const newUser = this.usersRepository.create({
      ...createUserDto,
      salt,
      password: hashPassword(createUserDto.password, salt),
    });
    const result = await this.usersRepository.save(newUser);
    delete result.password;
    delete result.salt;
    return result;
  }

  async findOneById(id: string): Promise<User | undefined> {
    return this.usersRepository.findOneBy({ id });
  }

  async findOneByUsername(username: string): Promise<User | undefined> {
    return this.usersRepository.findOneBy({ username });
  }

}
