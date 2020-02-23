import { Injectable } from '@nestjs/common';
import { DatabaseModel } from '../services/database.model';
import { Mysql } from '../connections/mysql';

export interface Test {
    id  ?: number,
    name?: string,
    age ?: number,
    city?: string
}

@Injectable()
export class TestModel extends DatabaseModel {
    constructor(private dbConnection: Mysql) {
        super(dbConnection);
    }
}
