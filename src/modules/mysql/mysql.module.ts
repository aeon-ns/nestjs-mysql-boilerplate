import { Module } from '@nestjs/common';
import { Mysql } from './connections/mysql';
import { DatabaseModel } from './services/database.model';

@Module({
    imports    : [],
    controllers: [],
    providers  : [
        Mysql,
        DatabaseModel,
    ],
    exports: [
        Mysql,
        DatabaseModel,
    ]
})
export class MysqlModule {}
