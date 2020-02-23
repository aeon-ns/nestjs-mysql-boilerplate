import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LedgerController } from './ledger/ledger.controller';
import { Mysql } from './connections/mysql';
import { Db, TestTable } from './helpers/db';
import { ResponseHelper } from './helpers/response.helper';

@Module({
  imports: [],
  controllers: [AppController, LedgerController],
  providers: [AppService, Mysql, Db, TestTable, ResponseHelper],
})
export class AppModule {}
