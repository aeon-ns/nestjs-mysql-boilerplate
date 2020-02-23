import { Controller, Get, Post, Body, Query, Param, Req, UseGuards, Res, HttpStatus } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { Mysql } from 'src/connections/mysql';
import { TestTable } from 'src/helpers/db';
import { ResponseHelper } from 'src/helpers/response.helper';
import { Http2ServerResponse } from 'http2';

@Controller('ledger')
@UseGuards(AuthGuard)
export class LedgerController {

    constructor(private db: Mysql, private testTable: TestTable, private Response: ResponseHelper) {}

    @Post('/:id')
    async getLedgerById(@Req() req, @Res() res) {
        // console.log('req: ', res);
        let result = await this.db.executeQuery('SELECT * FROM test');
        console.log(result);
        // let insertedObj = this.testTable.insertOne({
        //     name: 'Test',
        //     age : 27,
        //     city: ''
        // });
        // result = [...result, insertedObj]; 
        // res.status(204);
        this.Response.sendErrorResponse(404, 'Not found bro');
        return { code : 20, message: 'Success', data: result };
    }
}
