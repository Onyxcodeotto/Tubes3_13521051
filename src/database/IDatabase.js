const strmatch = require('../strmatch/strmatch.js');
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
    dumpDatabase();
    return hist;
}

function getAnswer(){
    let lev = new Levensthein();
    let kmp = new KMP();
    let bm = new BM();

    const connection = mysql.createConnection({
        host: host,
        user: user,
        password: password,
        database: database
    });

    let questions = [];
    connection.connect((err) => {
        if (err) throw err;
        console.log("Connected.");

        connection.query("SELECT question FROM qna", (err, result) => {
            if (err) throw err;
            questions = result;
        });
        connection.end();
    });

    let match = questions[0][0];

    for(let i_question in questions){
        if ((1-(lev.compare(q,i_question[0])/Math.max(q.length, i_question[0].length))) > (1-(lev.compare(q,match)/Math.max(q.length, match.length)))){
            match = i_question[0];
        }
    }

    let ans;
    connection.connect((err) => {
        if (err) throw err;
        console.log("Connected.");

        connection.query("SELECT answer FROM qna WHERE question = ${match}", (err, result) => {
            if (err) throw err;
            ans = result;
        });
        connection.end();
    });

    dumpDatabase();
    return ans[0];
}

function addqna(q,a){
    const connection = mysql.createConnection({
        host: host,
        user: user,
        password: password,
        database: database
    });

    connection.connect((err) => {
        if (err) throw err;
        console.log("Connected.");

        connection.query("INSERT INTO qna (question, answer) VALUES (${q}, ${a})", (err, result) => {
            if (err) throw err;
            console.log(result);
        });
        connection.end();
    });

    dumpDatabase();
}