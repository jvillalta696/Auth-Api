import sqlite3 from 'sqlite3';
sqlite3.verbose();

const db = new sqlite3.Database('src\\db\\auth.db');

export const executeQueryWithParams = async(query,params)=>{
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.all(query, params, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    });
};

export const executeQueryWithOutParams = async (query)=>{
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.all(query, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    });
};

export const executeBatchQuery = async (query,arrayParams)=>{
    return new Promise(async (resolve, reject) => {
        db.serialize(() => {
            db.run('BEGIN TRANSACTION'); // Inicia la transacción

            arrayParams.forEach(async params => {
                try {
                    await executeQueryWithParams(query, params);
                } catch (error) {
                    db.run('ROLLBACK'); // Revierte la transacción en caso de error
                    reject(error);
                }
            });

            db.run('COMMIT'); // Confirma la transacción si todo fue exitoso
            resolve('Batch de consultas ejecutado exitosamente');
        });
    });
}

