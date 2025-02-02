import { User } from "../entities/User";

export class ResponseUserDto {
  private id: number;
  private name: string;
  private email: string;


  constructor(user: User){
    this.id = user.id
    this.name = user.name;
    this.email = user.email
  }

}