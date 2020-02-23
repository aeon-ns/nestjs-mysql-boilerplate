import { Module } from '@nestjs/common';
import { MysqlModule } from '../mysql/mysql.module';
import { AccessTokenAuthGuard, TokenAuthGuard } from './guards/auth.guard';

@Module({
    imports    : [MysqlModule],
    controllers: [],
    providers  : [AccessTokenAuthGuard, TokenAuthGuard],
    exports    : [AccessTokenAuthGuard, TokenAuthGuard]
})
export class AuthModule {}
