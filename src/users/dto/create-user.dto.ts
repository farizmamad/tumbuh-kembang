import { IsDefined, IsStrongPassword } from 'class-validator'

export class CreateUserDto {
  @IsDefined({
    message: 'username: required',
  })
  username: string;
  @IsDefined({
    message: 'password: required',
  })
  @IsStrongPassword()
  password: string;
  @IsDefined({
    message: 'display_name: required',
  })
  display_name: string;

  salt?: string;
}
