import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number | undefined

  @Column({length: 45})
  real_name: string

  @Column({length: 45})
  account_name: string

  @Column()
  password: string

  @Column()
  password_salt: string

  @Column()
  mobile: string

  @Column('int')
  age: number


  constructor(real_name: string, account_name: string, password: string, password_salt: string, mobile: string, age: number) {
    this.real_name = real_name
    this.account_name = account_name
    this.password = password
    this.password_salt = password_salt
    this.mobile = mobile
    this.age = age
  }
}
