var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');

//추가한 부분
var mysql = require('mysql');
// Connection 객체 생성 
var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',   
  password: 'wkdgksmf2022@',
  database: 'review_db'  
});  
// Connect
connection.connect(function (err) {   
  if (err) {     
    console.error('mysql connection error');     
    console.error(err);     
    throw err;   
  } 
});

router.get('/', function (req, res) {
  connection.query("SELECT * FROM review", function (err, rows) {
    if (err) throw err;
    res.send(rows);
  });
});

router.get('/:id', function (req, res) {
  var id = parseInt(req.params.id, 10)
  connection.query("SELECT * FROM review WHERE store_id = '" + id + "'", function (err, rows) {
    if (err) throw err;
    res.send(rows);
  });
});

module.exports = router;
