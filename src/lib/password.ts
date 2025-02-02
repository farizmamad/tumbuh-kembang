import * as bcrypt from 'bcrypt';

export function createSalt(rounds: number = 10) {
  return bcrypt.genSaltSync(rounds);
}

export function hashPassword(password: string, saltOrRound: string | number) {
  return bcrypt.hashSync(password, saltOrRound);
}