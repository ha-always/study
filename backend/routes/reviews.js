var express = require('express');
var router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require("path");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/img/");
  },
  filename: function (req, file, cb) {
    //console.log(req)
    const fileName = Date.now() +  "_" + Buffer.from(file.originalname, 'latin1').toString('utf8') // 이미지 파일명에 타임스탬프 추가 및 한글 안깨지게
    cb(null, fileName)
  }
})
var upload = multer({ storage : storage});


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

router.get('/:num', function (req, res) {
  var num = parseInt(req.params.num, 10)
    connection.query("SELECT * FROM review WHERE review_id = '" + num + "'", function (err, rows) {
      if (err) throw err;
      res.send(rows);
    })
});

router.post('/create', upload.single('image'), (req, res, next) => {
  console.log(req.file.path)

  connection.query("INSERT INTO review (username, store_id, star, img, content) VALUES ('" + req.body.username + "', '"+ req.body.storeid +"', '"+ req.body.star  +"', '"+ req.file.filename + "', '" + req.body.content + "')", function (err, rows) {
    if (err) throw err;
    res.json({
      success: true,
      message: '등록되었습니다.'
    })
  });
})

router.post('/update:num', upload.single('image'), (req, res, next) => {
  var num = parseInt(req.params.num, 10)
  console.log(req.file.path)
  var num = req.body.id

  connection.query("UPDATE review SET star = '"+ req.body.star  +"', content = '" + req.body.content +"', img = '" + req.file.filename + "' WHERE review_id = '" + num +"'", function (err, rows) {
    if (err) throw err;
    res.json({
      success: true,
      message: '수정되었습니다.'
    })
  });
})

router.delete('/delete/:num', function (req, res) {
  var num = parseInt(req.params.num, 10)

  connection.query("DELETE FROM review WHERE review_id = '" + num +"'", function (err, rows) {
    if (err) throw err;
    res.json({
      success: true,
      message: '삭제되었습니다.'
    })
  });

})

router.post('/delete/img/:num', function (req, res) {
  var num = parseInt(req.params.num, 10)
  // const directory = fs.existsSync("../public")
  // console.log(directory)
  fs.unlink('public/img/' + req.body.data, error => {
    if (error?.code == 'ENOENT') {
      console.log("파일 삭제 Error 발생");
      res.json({
        success: false,
        message: '이미지 삭제 실패'
      })
      throw error;
    } else {
      connection.query("UPDATE review SET img = NULL WHERE review_id = '" + num + "'", function (err, rows) {
        if (err) throw err;
      })
      res.json({
        success: true,
        message: '이미지가 삭제되었습니다.'
      })
    }
  });

})


module.exports = router;
