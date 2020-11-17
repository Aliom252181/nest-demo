import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { UserService } from './user.service'
import { User } from './user.entity'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
  }


  @Get('findUser')
  async findUser(@Query() query: any): Promise<{ msg: string; code: number; data: any }> {
    return await this.userService.findUser(query.name)
  }

  @Post('login')
  async login(@Body() data: any): Promise<{ msg: string; code: number; data: any }> {
    const {account_name, password} = data
    if (account_name && password) return this.userService.login({account_name, password})
    return {code: -1, msg: '所有属性不能为空', data: undefined}
  }

  @Post('register')
  async register(@Body() data: any): Promise<{ msg: string; code: number; data: any }> {
    const { accountName, age, realName, password, mobile } = data
    const user = new User(realName, accountName, password, 'salt', mobile, age)
    let isAnyOneEmpty: boolean = false
    Object.keys(user).map((key) => {
      // @ts-ignore
      (!user[key] || user[key] == undefined) && (isAnyOneEmpty = true)
    })
    if (isAnyOneEmpty) return {code: -1, msg: '所有属性不能为空', data: undefined}
    return await this.userService.register(user)
  }
}
