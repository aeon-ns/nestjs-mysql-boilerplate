import { Injectable, Scope } from '@nestjs/common';
import { Mysql } from 'src/connections/mysql';

@Injectable({ scope: Scope.DEFAULT })
export class Db {

    tableName: string = 'test1';

    constructor(private db: Mysql) { }

    async insertOne(obj: object, tableName: string = this.tableName): Promise<object> {
        try {
            obj = Object.assign({}, obj);

            let keys   = Object.keys(obj);
            let query  = `INSERT INTO ${tableName} (${keys.join(', ')}) VALUES (${keys.map(x => '?').join(', ')})`;
            let result = await this.db.executeQuery(query, Object.values(obj));

            if (!result || !result.insertId) {
                throw new Error('Could\'nt insert data in db');
            }
            
            obj['id'] = result.insertId;
            return obj;
        } catch (e) {
            console.error('[Db][insert] e: ', e);
            throw e;
        }
    }

    async find(condition?: object, tableName: string = this.tableName): Promise<any> {
        return "success";
    }
}

interface Test {
    id? : number | string,
    name: string,
    age : number,
    city: string
}

@Injectable({ scope: Scope.DEFAULT })
export class TestTable extends Db {
    tableName = 'test';
    async insertOne(obj: Test): Promise<any> {
        return super.insertOne(obj, this.tableName);
    }
}
