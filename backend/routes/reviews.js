var express = require('express');
var router = express.Router();
const multer = require('multer');
const fs = require('fs');

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

router.post('/create', function (req, res) {
  var id = parseInt(req.params.id, 10)
  const form = {
    'username': req.body.form.username,
    'storeid': req.body.form.storeid,
    'star': req.body.form.star,
    'content': req.body.form.content,
    'img': req.body.form.img,
  };

  console.log(req.file)

  connection.query("INSERT INTO review (username, store_id, star, content) VALUES ('" + form.username + "', '"+ form.storeid +"', '"+ form.star  +"', '" + form.content + "')", function (err, rows) {
    if (err) throw err;
    res.json({
      success: true,
      message: '등록되었습니다.'
    })
  });
});

router.put('/update/:num', function (req, res) {
  var num = parseInt(req.params.num, 10)
  const review = {
    'username': req.body.reviews.username,
    'storeid': req.body.reviews.storeid,
    'star': req.body.reviews.star,
    'content': req.body.reviews.content,
  };

  connection.query("UPDATE review SET star = '"+ review.star  +"', content = '" + review.content + "' WHERE review_id = '" + num +"'", function (err, rows) {
    if (err) throw err;
    res.json({
      success: true,
      message: '수정되었습니다.'
    })
  });
});

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


router.post('/imgUpload', upload.single('image'), (req, res, next) => {
  console.log(req.file)
})

module.exports = router;
