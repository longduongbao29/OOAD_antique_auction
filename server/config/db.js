const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');
const { Script } = require('vm');
// Tạo kết nối với database MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rootpassword',
    database: 'ooad'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Connected to MySQL Database');
    }
    
    db.query('CREATE DATABASE IF NOT EXISTS ooad', (err) => {
        if (err) {
            console.error('Lỗi khi tạo database:', err);
            return;
        }
    });


    db.query('USE ooad', (err) => {
        if (err) {
            console.error('Error:', err);
            return;
        }
    });
    const sqlScript = fs.readFileSync(path.join(__dirname, '..', 'database', 'init.sql')).toString();
    scripts = sqlScript.split(";")
    scripts.forEach(script => {
        script = script.replace(/\n/g, '')
    if (script){    db.query(script, (err, results) => {
    if (err) {
      console.error('Failed when execute script', err);
    }  });}
    
});

});

module.exports = db;
