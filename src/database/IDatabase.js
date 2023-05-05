const { Levensthein, KMP, BM } = require('../strmatch/strmatch');
const mysql = require('mysql');
const mysqldump = require('mysqldump');
// const fs = require('fs');
// const { exec } = require('child_process');

const host = "localhost";
const user = "root";
const password = "password";
const database = "askflickerdb";
const dumpfile = __dirname + "\\askflickerdb.sql";

function dumpDatabase() {
  const connection2 = mysql.createConnection({
    host: host,
    user: user,
    password: password,
    database: database
  });

  connection2.connect((err) => {
    if (err) throw err;
    console.log("Connected.");

    mysqldump({
      connection: connection2,
      dumpToFile: dumpfile
    })
    .then(() => {
      console.log('Dumped.');
      connection2.end();
    })
    .catch((error) => {
      console.error(error);
      connection2.end();
    });
  });
}


// function dumpDatabase(){
//     const connection2 = mysql.createConnection({
//         host: host,
//         user: user,
//         password: password,
//         database: database
//     });
    
//     connection2.connect((err) => {
//         if (err) throw err;
//         console.log("Connected.");
      
//         const dump = fs.readFileSync(dumpfile, 'utf8');
//         const statements = dump.split(';');
      
//         statements.forEach((statement) => {
//           connection2.query(statement, (err, result) => {
//             if (err) throw err;
//           });
//         });
      
//         connection2.end();
//     });
// }

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

        connection.query("SELECT question, answer FROM history WHERE descr = " + descr, (err, result) => {
            if (err) throw err;
            hist = result;
        });
        connection.end();
    });
    dumpDatabase();
    return hist;
}


function getAnswer(text){
    return new Promise((resolve, reject) => {
      let lev = new Levensthein();
      let kmp = new KMP();
      let bm = new BM();
  
      const connection = mysql.createConnection({
        host: host,
        user: user,
        password: password,
        database: database
      });
  
      let question;
      let pattern;
      let found = false;
      let match;
      connection.connect((err) => {
        if (err) {
          reject(err);
        }
        console.log("Connected.");
  
        connection.query("SELECT question FROM qna", (err, result) => {
          if (err) {
            reject(err);
          }
          const questions = result.map(obj => obj.question);
  
          match = questions[0];
  
          // KMP
          for(question in questions){
            pattern = question;
            if(kmp.comparePattern(text, pattern) == true){
              found = true;
              match = question;
            }
          }
          // if found with KMP
          if(found){
            connection.query("SELECT answer FROM qna WHERE question = " + match, (err, result) => {
              if (err) {
                reject(err);
              }
              let ans = result[0].answer;
              resolve(ans);
            });
          }
          // BM
          for(question in questions){
            pattern = question;
            if(bm.comparePattern(text, pattern) == true){
              found = true;
              match = question;
            }
          }
          // if found with BM
          if(found){
            connection.query("SELECT answer FROM qna WHERE question = " + match, (err, result) => {
              if (err) {
                reject(err);
              }
              let ans = result[0].answer;
              resolve(ans);
            });
          }
  
          // Levensthein
          for(question in questions){
            pattern = question;
            if ((1-(lev.compare(text,pattern)/Math.max(text.length, pattern.length))) > (1-(lev.compare(text,match)/Math.max(text.length, match.length)))){
              match = question;
            }
          }
  
          connection.query("SELECT answer FROM qna WHERE question = '"+ match +"'", (err, result) => {
            if (err) {
              reject(err);
            }
            let ans = result[0].answer;
            resolve(ans);
          });
          connection.end();
        });
      });
    });
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

        connection.query("INSERT INTO qna (question, answer) VALUES (" + q + "," +  a + ")", (err, result) => {
            if (err) throw err;
            console.log(result);
        });
        connection.end();
    });

    dumpDatabase();
}

module.exports = {
    getAnswer: getAnswer,
    dumpDatabase: dumpDatabase
  };