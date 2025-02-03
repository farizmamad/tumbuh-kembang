export class TokenDto {
  access_token: string;
  refresh_token?: string;
}

export class TokenPayloadDto {
  sub: string;
  username: string;
}