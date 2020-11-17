import { Controller, Get, Post } from '@nestjs/common'
import { HelloService } from './hello.service'
import { Cache } from '../_common/Cache.service'


@Controller('/hello')
export class HelloController {

    constructor(
        private readonly helloWorldService: HelloService,
        private readonly cache: Cache,
    ) {}

    @Get('/sayHello')
    async sayHello() {
        return await this.helloWorldService.sayHello()
    }

    @Post('/sayHi')
    async sayHi() {
        return await this.cache.cacheFactory({cacheKey: 'cacheSayHi'}, () => {
            return this.helloWorldService.sayHello()
        })
    }
}

