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
  connection.query('SELECT * FROM users', function (err, rows) {
    if (err) throw err;
    res.send(rows);
  });
});
router.post('/signUp', function (req, res) {
  const user = {
    'userid': req.body.user.userid,
    'userpw': req.body.user.userpw
  };
  try {
    if (!user.userid) {
      throw new Error('아이디는 필수입니다.')
    }
    if (!user.userpw) {
      throw new Error('비밀번호는 필수입니다.')
    }
    connection.query("SELECT userid FROM users WHERE userid = '" + user.userid + "'", function (err, row) {
      if (row[0] == undefined){ //  동일한 아이디가 없을경우,
        const salt = bcrypt.genSaltSync();
        const encryptedPassword = bcrypt.hashSync(user.userpw, salt);
        connection.query("INSERT INTO users (userid,userpw) VALUES ('" + user.userid + "','" + encryptedPassword + "')", user, function (err, row2) {
          if (err) throw err;
        });
        res.json({
          success: true,
          message: '가입이 완료되었습니다.'
        })
      }
      else {
        res.json({
          success: false,
          message: '동일한 아이디가 존재합니다.'
        })
      }
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message || '오류가 발생했습니다.'
    })
  }
  
});
router.post('/login', function (req, res) {
  const user = {
    'userid': req.body.user.userid,
    'userpw': req.body.user.userpw
  };
  connection.query("SELECT userid, userpw FROM users WHERE userid = '" + user.userid + "'", function (err, row) {
    console.log(row[0]);
    if (err) {
      res.json({ // 매칭되는 아이디 없을 경우
        success: false,
        message: '로그인 실패!'
      })
    }
    if (row[0] !== undefined && row[0].userid === user.userid) {
      bcrypt.compare(user.userpw, row[0].userpw, function (err, res2) {
        if (res2) {
            req.session.user = {
              id: user.userid,
              pw: user.userpw,
              authorized: true,
            };
            res.json({ // 로그인 성공 
              success: true,
              message: '로그인이 완료되었습니다.',
              user: req.session.user
            })
        } else {
          res.json({ // 매칭되는 아이디는 있으나, 비밀번호가 틀린 경우
            success: false,
            message: '비밀번호를 확인하세요.'
          })
        }
      })
    }
  })
});
module.exports = router;
