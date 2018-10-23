var mysql = require('mysql');
const utf8 = require('utf8');
function createDBConnection() {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'horas'
    });

}


module.exports = function () {
    return createDBConnection;
}