import { Injectable, Scope } from '@nestjs/common';
import * as mysql from 'mysql';

@Injectable({ scope: Scope.DEFAULT })
export class Mysql {
    connection:any;
    constructor() {
        this.connection = mysql.createConnection({
            host     : 'localhost',
            user     : 'root',
            password : 'root',
            database : 'Test'
        });
    }

    executeQuery(query: string, values:any[] = []): Promise<any> {
        return new Promise((resolve, reject) => {
            console.log('[MYSQL] query: ', query);
            this.connection.query(query, values, function (error, results, fields) {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    }

    close() {
        this.connection.end();
    }
    
}
