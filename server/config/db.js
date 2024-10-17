const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');
// Tạo kết nối với database MySQL
const db = mysql.createConnection({
    host: 'db',
    user: 'root',
    password: 'rootpassword',
    port: 3306,
    database: 'ooad'
});
function connect_db() {
    db.connect((err) => {
        if (err) {
            console.log('Error connecting to MySQL, retrying in 5 seconds...', err);
            setTimeout(connect_db, 5000);
        } else {
            const sqlScript = fs.readFileSync(path.join(__dirname, '..', 'database', 'init.sql')).toString();
            scripts = sqlScript.split(";")
            scripts.forEach(script => {
                script = script.replace(/\n/g, '')
                if (script) {
                    db.query(script, (err, results) => {
                        if (err) {
                            console.error('Failed when execute script', err);
                        }
                    });
                }

            });
            console.log('Connected to MySQL Database');
        }
    });  
}
connect_db();
module.exports = db;
