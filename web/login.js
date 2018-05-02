var app = require('express');
var router = app.Router();
var mysql = require('mysql');
var con = require('./conn');
var express = require('express');


router.post('/submit', function(req, res) {
  let username = req.body.username;
  let password = req.body.password;
  let usertype = req.body.usertype;
  let query = `select ppassword from ${usertype} where ${usertype}id = '${username}';`;
  let warning = 'Unauthorized access is strictly prohibited.';
  // console.log(query);
  if (usertype == 'administrator' && username =='admin'){
    if (password == 'sudo' || password == 'admin')  {
      req.session.data = {"usertype":'admin'};
      res.redirect('/admin');

    }
    else res.send(warning);
  }else {
    con.query(query,function(err,queryResult){
      if (err) {
        console.log("Query error: "+err);
        res.send("Query error: "+err);
      }
      else {
        console.log(queryResult[0],password);
        if ( queryResult.length<1 ) {
          console.log(warning);
          res.send(warning);
        }
        else if (password == queryResult[0].ppassword) {
          req.session.data = {
            "username":username,
            "usertype":usertype
          };
          console.log('session > ',req.session);
          if (usertype == 'student')
          res.redirect('/login/student');
          else if (usertype == 'candidate')
          res.redirect('/login/candidate');
          else if (usertype == 'teacher')
          res.redirect('/login/teacher');

        }
        else {
          console.log(warning);
          res.send(warning);
        }
      }

    });
  }
})

router.get('/student', function(req, res){
  res.sendfile('./index.html');
})

router.get('/teacher', function(req, res){
  res.sendfile('./teacher.html');
})

router.get('/candidate', function(req, res){
  res.sendfile('./candidate.html');
})

router.get('/getuserid', function(req, res){
  res.send(req.session.data);
})

// router.post('/submit2', function(req, res){
//   console.log(req.body);
//   res.redirect('/login/student');
//   // res.sendfile("./admin.html");
// })


router.get('/', function(req, res){
  res.sendfile("./login.html");
})


module.exports = router;
