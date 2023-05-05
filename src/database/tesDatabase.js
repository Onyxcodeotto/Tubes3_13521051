const { getAnswer, dumpDatabase } = require('./IDatabase.js');

console.log("Hello");

let anss = '';
getAnswer("matkul seru semester").then(answer => {anss = answer; console.log(anss);}).catch(error => {console.error(error);});
// const ans = returnAnswer("matkul seru");
// console.log(ans);

// const { Levensthein, KMP, BM } = require('../strmatch/strmatch');
// const mysql = require('mysql');
// const fs = require('fs');
// const { exec } = require('child_process');

// const host = "localhost";
// const user = "root";
// const password = "password";
// const database = "askflickerdb";
// const dumpfile = __dirname + "\\askflickerdb.sql";

// let lev = new Levensthein();
//     let kmp = new KMP();
//     let bm = new BM();

// const connection = mysql.createConnection({
//     host: host,
//     user: user,
//     password: password,
//     database: database
// });

// let text = "matkul wajib seru";
// let question;
// let ans;
// let pattern;
// let found = false;
// let match;
// connection.connect((err) => {
//     if (err) throw err;
//     console.log("Connected.");

//     connection.query("SELECT question FROM qna", (err, result) => {
//         if (err) throw err;
//         const questions = result.map(obj => obj.question);
//         console.log(questions);
    
//         match = questions[0];
//         console.log(match);

//         // KMP
//         for(question in questions){
//             pattern = question;
//             if(kmp.comparePattern(text, pattern) == true){
//                 found = true;
//                 match = question;
//             }
//         }
//         // if found with KMP
//         if(found){
//             connection.query("SELECT answer FROM qna WHERE question = " + match, (err, result) => {
//                 if (err) throw err;
//                 ans = result;
//             });
//             dumpDatabase();
//             console.log(ans);
//             return;
//         }

//         // BM
//         for(question in questions){
//             pattern = question;
//             if(bm.comparePattern(text, pattern) == true){
//                 found = true;
//                 match = question;
//             }
//         }
//         // if found with BM
//         if(found){
//             connection.query("SELECT answer FROM qna WHERE question = " + match, (err, result) => {
//                 if (err) throw err;
//                 ans = result;
//             });
//             dumpDatabase();
//         }
        
//         // Levensthein
//         for(question in questions){
//             pattern = question;
//             if ((1-(lev.compare(text,pattern)/Math.max(text.length, pattern.length))) > (1-(lev.compare(text,match)/Math.max(text.length, match.length)))){
//                 match = question;
//             }
//         }

//         connection.query("SELECT answer FROM qna WHERE question = '"+ match +"'", (err, result) => {
//             if (err) throw err;
//             ans = result[0].answer;
//             console.log(ans);
//         });
//         connection.end();
//         dumpDatabase();
//     });
// });
