import { Module } from '@nestjs/common'
import { HelloModule } from './hello/hello.module'
import { FileModule } from './file/file.module'
import { UserModule } from './user/user.module'


@Module({
  imports: [
    HelloModule,
    FileModule,
    UserModule
  ]
})
export class FeatureModule {
}
