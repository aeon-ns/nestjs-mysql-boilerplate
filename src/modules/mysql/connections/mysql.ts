import { Injectable, Scope, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import * as mysql from 'mysql';

@Injectable({ scope: Scope.DEFAULT })
export class Mysql implements OnModuleInit, OnModuleDestroy {
    
    masterConnection: any;
    slaveConnection : any;
    
    constructor() {}

    onModuleInit() {
        console.log('[Mysql] Creating Master Connection', process.env.DB_MASTER_HOST);
        this.masterConnection = mysql.createPool({
            host           : process.env.DB_MASTER_HOST,
            user           : process.env.DB_MASTER_USER,
            password       : process.env.DB_MASTER_PASSWORD,
            database       : process.env.DB_MASTER_NAME,
            port           : process.env.DB_MASTER_PORT,
            connectionLimit: process.env.DB_MASTER_CONNECTIONS
        });
        this.masterConnection.on('enqueue', () => console.log('[Mysql] Master Db connected'));
        console.log('[Mysql] Creating Slave Connection');
        this.slaveConnection = mysql.createPool({
            host           : process.env.DB_SLAVE_HOST,
            user           : process.env.DB_SLAVE_USER,
            password       : process.env.DB_SLAVE_PASSWORD,
            database       : process.env.DB_SLAVE_NAME,
            port           : process.env.DB_SLAVE_PORT,
            connectionLimit: process.env.DB_SLAVE_CONNECTIONS
        });
        this.slaveConnection.on('connection', () => console.log('[Mysql] Slave Db connected'));
    }

    onModuleDestroy() {
        console.log('[Mysql] Closing Connection(s)');
        this.masterConnection.end();
        this.slaveConnection.end();
    }

    executeQueryOnMaster(query: string, values:any[] = []): Promise<any> {
        return new Promise((resolve, reject) => {
            console.log('[MYSQL] query: ', query);
            this.masterConnection.query(query, values, function (error, results, fields) {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    }

    executeQueryOnSlave(query: string, values:any[] = []): Promise<any> {
        return new Promise((resolve, reject) => {
            console.log('[MYSQL] query: ', query);
            this.slaveConnection.query(query, values, function (error, results, fields) {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    }

}
