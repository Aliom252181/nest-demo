import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './user.entity'
import { makeSalt, encryptPassword } from '../../common/utils/cryptogram' // 引入加密函数

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
  }

  /**
   * 查询是否有该角色
   * @param account_name 用户名
   */
  async findUser(account_name: string): Promise<{ msg: string; code: number; data: any}> {
    const user = await this.userRepository.find({account_name})
    if (user.length > 0) return {msg: '操作成功', code: 0, data: user[0]}
    return {code: -1, msg: '用户名已存在', data: undefined}
  }

  /**
   * 登录
   * @param data 登录信息
   */
  async login(data: any): Promise<{ msg: string; code: number; data: any}> {
    const user = await (await this.findUser(data.account_name)).data
    const hashPwd = encryptPassword(data.password, user.password_salt)
    if (hashPwd === user.password) {
      return {code: 0, msg: '操作成功', data: user}
    }
    return {code: -1, msg: '用户名已存在', data: undefined}
  }

  /**
   * 注册
   * @param data 前端传回的数据
   */
  async register(data: User): Promise<{ msg: string; code: number; data: any }> {
    const {real_name, account_name, password, mobile, age} = data
    const user = await (await this.findUser(account_name)).data
    if (user) return { code: -1, msg: '用户名已存在', data: undefined }
     
    const salt = makeSalt() // 制作密码盐
    const hashPwd = encryptPassword(password, salt)  // 加密密码
    const userData = new User(real_name, account_name, hashPwd, salt, mobile, age)

    return { code: 0, msg: '操作成功', data: await this.userRepository.save(userData) }

  }
}
