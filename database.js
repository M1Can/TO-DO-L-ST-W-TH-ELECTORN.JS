const mysql = require("mysql");

const bağlantı = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "UTF-8Unicode",
    database: "KAYITLAR"
});

bağlantı.connect();

module.exports = {
    db: bağlantı
};