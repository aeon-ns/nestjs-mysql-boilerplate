import { Injectable, Scope } from '@nestjs/common';
import { Mysql } from '../connections/mysql';

@Injectable({ scope: Scope.TRANSIENT })
export class DatabaseModel {

    tableName: string;
    constructor(private db: Mysql) {}

    setTableName (tableName: string) {
        this.tableName = tableName;
    }

    async insertOne(obj: object, tableName: string = this.tableName): Promise<object> {
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

    async insertMany(insertArray: Array<object>, tableName: string = this.tableName): Promise<boolean> {
        try {
            let keys   = Object.keys(insertArray[0]);

            let query  = `INSERT INTO ${tableName} (${keys.join(', ')}) 
                            VALUES ${insertArray.map(obj => `(${keys.map(x => '?').join(', ')})`).join(', ')}`;
            let result = await this.db.executeQueryOnMaster(query, 
                insertArray.reduce((acc: Array<any>, obj: object) => acc.concat(Object.values(obj)), [] as any));

            if (!result || !result.insertId) {
                throw new Error('Could\'nt insert data in db');
            }
            return true;
        } catch (e) {
            console.error('[Db][insert] e: ', e);
            throw e;
        }
    }

    async find(condition: object, operator: 'AND'|'OR' = 'AND', tableName: string = this.tableName): Promise<object[]> {
        try {           
            condition = Object.assign({}, condition);
            let keys  = Object.keys(condition);
            let query = `
                SELECT * FROM ${tableName} 
                WHERE ${keys.map(key => ` ${key} = ? `).join(` ${operator} `)}
            `;
            let result: object[] = await this.db.executeQueryOnSlave(query, Object.values(condition));

            if (!result || !result.length) {
                return [];
            }
            return result;
        } catch (e) {
            console.error('[Db][insert] e: ', e);
            throw e;
        } 
    }

    async findOne(condition: object, operator: 'AND'|'OR' = 'AND', tableName: string = this.tableName): Promise<object> {
        try {           
            condition = Object.assign({}, condition);
            let keys   = Object.keys(condition);
            let query  = `
                SELECT * FROM ${tableName} 
                WHERE ${keys.map(key => ` ${key} = ? `).join(` ${operator} `)}
                LIMIT 1
            `;
            let result: object[] = await this.db.executeQueryOnSlave(query, Object.values(condition));

            if (!result || !result.length) {
                return null;
            }
            return result[0];
        } catch (e) {
            console.error('[Db][insert] e: ', e);
            throw e;
        } 
    }

    async update(obj: object, condition: object = {}, operator: 'AND'|'OR' = 'AND', tableName: string = this.tableName): Promise<boolean> {
        try {
            obj = Object.assign({}, obj);

            let keys   = Object.keys(obj);
            let conditionKeys = condition && Object.keys(condition) || [];
            
            let query  = `
                UPDATE ${tableName}
                SET ${keys.map(key => ` ${key} = ? `).join(', ')}
                ${conditionKeys.length ? `
                    WHERE ${conditionKeys.map(key => ` ${key} = ? `).join(` ${operator} `)}
                `: ''} 
            `;

            let result = await this.db.executeQueryOnMaster(query, 
                Object.values(obj).concat(Object.values(condition || {})));

            if (!result || !result.affectedRows) {
                return false;
            }
            return true;
        } catch (e) {
            console.error('[Db][insert] e: ', e);
            throw e;
        } 
    }

    
}