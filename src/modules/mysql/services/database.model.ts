import { Injectable, Scope } from '@nestjs/common';
import { Mysql } from '../connections/mysql';

@Injectable({ scope: Scope.DEFAULT })
export class DatabaseModel {

    tableName: string;
    constructor(private db: Mysql) {}

    setTableName (tableName: string) {
        this.tableName = tableName;
    }

    async insertOne(obj: object): Promise<object> {
        try {
            obj = Object.assign({}, obj);

            let keys   = Object.keys(obj);
            let query  = `INSERT INTO ${this.tableName} (${keys.join(', ')}) VALUES (${keys.map(x => '?').join(', ')})`;
            let result = await this.db.executeQueryOnMaster(query, Object.values(obj));

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

    async insertMany(arr: Array<object>, tableName: string = this.tableName): Promise<boolean> {
        try {
            
            let keys   = Object.keys(arr[0]);
            let query  = `INSERT INTO ${tableName} (${keys.join(', ')}) 
                            VALUES ${arr.map(obj => `(${keys.map(x => '?').join(', ')})`).join(', ')}`;
            let result = await this.db.executeQueryOnMaster(query, 
                arr.reduce((acc: Array<any>, obj: object) => acc.concat(Object.values(obj)), [] as any));

            if (!result || !result.insertId) {
                throw new Error('Could\'nt insert data in db');
            }
            return true;
        } catch (e) {
            console.error('[Db][insert] e: ', e);
            throw e;
        }
    }
    
}