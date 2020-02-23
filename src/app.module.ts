import { Module } from '@nestjs/common';

/* External */
import { MysqlModule } from './modules/mysql/mysql.module';

/* Local */
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ResponseHelper } from './helpers/response.helper';

@Module({
  imports    : [MysqlModule],
  controllers: [AppController],
  providers  : [AppService, ResponseHelper],
})
export class AppModule {}
