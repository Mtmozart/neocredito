import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { dataSourceConfig } from './database';
import { UserModule } from './modules/user/user.module';

@Module({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  imports: [TypeOrmModule.forRoot(dataSourceConfig() as TypeOrmModuleOptions),
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
