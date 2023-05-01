const mysql = require('mysql');
const mysqldump = require('mysqldump');
const fs = require('fs');
const { exec } = require('child_process');

const host = "localhost";
const user = "root";
const password = "password";
const database = "askflickerdb";
const dumpfile = __dirname + "\\askflickerdb.sql";

function dumpDatabase(){
    const connection2 = mysql.createConnection({
        host: host,
        user: user,
        password: password,
        database: database
    });
    
    connection2.connect((err) => {
        if (err) throw err;
        console.log("Connected.");
      
        const dump = fs.readFileSync(dumpfile, 'utf8');
        const statements = dump.split(';');
      
        statements.forEach((statement) => {
          connection2.query(statement, (err, result) => {
            if (err) throw err;
            console.log(result);
          });
        });
      
        connection2.end();
    });
}

function readDatabase(){
    const connection = mysql.createConnection({
        host: host,
        user: user,
        password: password
      });
    connection.connect((err) => {
        if (err) throw err;
        console.log("Connected to server.");

        connection.query("DROP DATABASE IF EXISTS askflickerdb;", (err, result) => {
            if (err) throw err;
            console.log("Database dropped.");
        });
      
        connection.query("CREATE DATABASE askflickerdb;", (err, result) => {
            if (err) throw err;
            console.log(result);
        });
        connection.end();
    });

    dumpDatabase();
}

function history(descr){
    const connection = mysql.createConnection({
        host: host,
        user: user,
        password: password,
        database: database
    });

    let hist = [];
    connection.connect((err) => {
        if (err) throw err;
        console.log("Connected.");

        connection.query("SELECT question, answer FROM history WHERE descr = ?", [descr] , (err, result) => {
            if (err) throw err;
            hist = result;
        });
        connection.end();
    });
    return hist;
}