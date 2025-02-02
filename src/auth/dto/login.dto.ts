import { IsDefined, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsDefined({
    message: 'username: required',
  })
  @IsNotEmpty()
  username: string;
  @IsDefined({
    message: 'password: required',
  })
  @IsNotEmpty()
  password: string;
}
