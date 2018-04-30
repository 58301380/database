var app = require('express');
var router = app.Router();
var mysql = require('mysql');
var con = require('./conn');

router.post('/search', function(req, res){
  let searchtype = req.body.searchtype;
  let table = req.body.table;
  
  if (searchtype=="filter-search") {
    let item = req.body.item;
    let filter = req.body.filter;
    let searchquery = `select * from ${table} where ${filter} = '${item}';`;
    console.log(searchquery);
    con.query(searchquery, function(err, searchresult) {
      if (err) {
        console.log(err);
        res.send("error");
        return;
      }
      if (searchresult.length<1) {
        res.send("empty");
        return;
      }
      res.send(searchresult);
    });

    return;
  }
  if (searchtype=="display-all") {
    let searchquery = `select * from ${table};`;
    console.log(searchquery);
    con.query(searchquery, function(err, searchresult) {
      if (err) {
        console.log(err);
        res.send("error");
        return;
      }
      res.send(searchresult);
    });

    return;
  }

  console.log("Search Type Error!~~");

})

router.post('/delete', function(req, res){
  let table = req.body.table;
  let item = req.body.item;
  let filter = req.body.filter;
  let deletequery = `delete from ${table} where ${filter} = '${item}';`;

  con.query(deletequery, function(err, deleteresult){
    if (err) {
      console.log(err);
      res.send("error");
      return;
    }
    res.send(deleteresult);
  });
})

router.post('/insert', function(req,res){

  let usertype = req.body.usertype;
  let idno = req.body.idno;
  let fname = req.body.fname;
  let lname = req.body.lname;
  let sex = req.body.sex;
  let phoneno = req.body.phoneno;
  let address = req.body.address;
  let bdate = req.body.bdate;
  let id = req.body.id;
  let password = req.body.password;
  let facultyname = req.body.facultyname;
  let departmentname = req.body.departmentname;
  let salary = req.body.salary;
  let grade = req.body.grade;
  let registertype = req.body.registertype;

  let insertquery = `call insert${usertype}('${idno}','${fname}',`
    +`'${lname}','${sex}','${bdate}','${address}','${phoneno}',`
    +`'${facultyname}','${departmentname}',`;

  if (usertype=='Candidate') {
    var yyear = new Date().getFullYear();
    insertquery += `'${yyear}','${grade}','${registertype}','${id}',`;
  }
  if (usertype=='Student') {
    var startDate = new Date();
    console.log(startDate);
    insertquery += `'${id}','${startDate}',`;
  }
  if (usertype=='Teacher') {
    insertquery += `'${id}','${salary}',`;
  }
  insertquery += `'${password}');`;
  console.log(insertquery);
  con.query(insertquery, function(err, queryresult){
    if (err) {
      console.log(err);
      res.send("error");
      return;
    }
    console.log(queryresult);
    res.send("Sukoi Tanoshiii!");
  });
})

router.get('/', function(req, res){
  res.sendfile('./admin.html');
})


module.exports = router;
