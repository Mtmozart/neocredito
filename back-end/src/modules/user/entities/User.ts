import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({name: 'name'})
  name: string

  @Column({name: 'email'})
  email: string

  @Column({name: 'password'})
  password: string


}