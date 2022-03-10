const sql = require("mssql");

function recHit(database, consultaSQL): Promise<any> {
    const config = {
        user: 'sa',
        password: 'LOperas93786',
        server: 'web.nubehit.com', //server: '34.243.59.142',
        database: database,
        requestTimeout: 300000
    };

    const devolver = new Promise((dev, rej) => {
        new sql.ConnectionPool(config).connect().then((pool) => {
            return pool.request().query(consultaSQL);
        }).then(result => {
            dev(result);
            sql.close();
        }).catch(err => {
            console.log(err);
            console.log("SQL: ", consultaSQL)
            sql.close();
        });
    });
    return devolver;
}
export { recHit };
