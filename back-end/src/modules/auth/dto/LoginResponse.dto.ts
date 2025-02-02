export class LoginResponseDto {
  private token: string;

  constructor(token: string) {
    this.token = token;
  }
}
