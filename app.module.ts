import { Module } from '@nestjs/common'
import { CoreModule } from './modules/core.module'
import { CommonModule } from './modules/common.module'
import { FeatureModule } from './modules/feature.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Connection } from 'typeorm'


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'test',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    CoreModule,
    FeatureModule,
    CommonModule,
  ]
})

export default class ApplicationModule {
  constructor(private readonly connection: Connection) {
  }
}
