var app = require('express');
var router = app.Router();
var mysql = require('mysql');
var con = require('./conn');

router.post('/callviewSubject', function(req,res){
  let CandidateID = req.body.CandidateID;
  let callQuery = `call viewSubject('${CandidateID}');`;
  console.log(callQuery);
  con.query(callQuery, function(err, callresult) {
    if (err) {
      console.log(err);
      res.send("error");
      return;
    }
    if (callresult.length<1) {
      res.send("empty");
      return;
    }
    console.log(callresult[0]);
    res.send(callresult[0]);
  });
  return;
});

router.post('/callPrintCandidateStatus', function(req,res){
  let CandidateID = req.body.CandidateID;
  let callQuery = `call PrintCandidateStatus('${CandidateID}');`;
  console.log(callQuery);
  con.query(callQuery, function(err, callresult) {
    if (err) {
      console.log(err);
      res.send("error");
      return;
    }
    if (callresult.length<1) {
      res.send("empty");
      return;
    }
    console.log(callresult[0]);
    res.send(callresult[0]);
  });
  return;
});

router.post('/callTeacherTeachCourse', function(req,res){
  let inteacherID = req.body.inteacherID;
  let callQuery = `call TeacherTeachCourse('${inteacherID}');`;
  console.log(callQuery);
  con.query(callQuery, function(err, callresult) {
    if (err) {
      console.log(err);
      res.send("error");
      return;
    }
    if (callresult.length<1) {
      res.send("empty");
      return;
    }
    console.log(callresult[0]);
    res.send(callresult[0]);
  });
  return;
});

router.post('/callupdateGrade', function(req,res){
  let incourseNo = req.body.incourseNo;
  let inSection = req.body.inSection;
  let inStudentID = req.body.inStudentID;
  let inGrade = req.body.inGrade;
  let callQuery = `call updateGrade('${incourseNo}','${inSection}','${inStudentID}','${inGrade}');`;
  console.log(callQuery);
  con.query(callQuery, function(err, callresult) {
    if (err) {
      console.log(err);
      res.send("error");
      return;
    }
    if (callresult.length<1) {
      res.send("empty");
      return;
    }
    console.log(callresult[0]);
    res.send(callresult[0]);
  });
  return;
});

router.post('/callviewStudent', function(req,res){
  let Teacher = req.body.Teacher;
  let cNumber = req.body.cNumber;
  let callQuery = `call viewStudent('${Teacher}','${cNumber}');`;
  console.log(callQuery);
  con.query(callQuery, function(err, callresult) {
    if (err) {
      console.log(err);
      res.send("error");
      return;
    }
    if (callresult.length<1) {
      res.send("empty");
      return;
    }
    console.log(callresult[0]);
    res.send(callresult[0]);
  });
  return;
});

router.post('/callstudentAdvise', function(req,res){
  let inteacherID = req.body.inteacherID;
  let callQuery = `call studentAdvise('${inteacherID}');`;
  console.log(callQuery);
  con.query(callQuery, function(err, callresult) {
    if (err) {
      console.log(err);
      res.send("error");
      return;
    }
    if (callresult.length<1) {
      res.send("empty");
      return;
    }
    console.log(callresult[0]);
    res.send(callresult[0]);
  });
  return;
});

router.post('/callwithdraw', function(req,res){
  let incourseNo = req.body.incourseNo;
  let inSection = req.body.inSection;
  let inStudentID = req.body.inStudentID;
  let callQuery = `call withdraw('${incourseNo}','${inSection}','${inStudentID}');`;
  console.log(callQuery);
  con.query(callQuery, function(err, callresult) {
    if (err) {
      console.log(err);
      res.send("error");
      return;
    }
    if (callresult.length<1) {
      res.send("empty");
      return;
    }
    console.log(callresult[0]);
    res.send(callresult[0]);
  });
  return;
});

router.post('/callInsertEnroll', function(req,res){
  let incourseNo = req.body.incourseNo;
  let inSection = req.body.inSection;
  let inStudentID = req.body.inStudentID;
  let callQuery = `call insertEnroll('${incourseNo}','${inSection}','${inStudentID}');`;
  console.log(callQuery);
  con.query(callQuery, function(err, callresult) {
    if (err) {
      console.log(err);
      res.send("error");
      return;
    }
    if (callresult.length<1) {
      res.send("empty");
      return;
    }
    console.log(callresult[0]);
    res.send(callresult[0]);
  });
  return;
});

router.post('/callOverviewCourse', function(req,res){
  let studentID = req.body.studentID;

  let callQuery = `call OverviewCourse('${studentID}');`;
  console.log(callQuery);
  con.query(callQuery, function(err, callresult) {
    if (err) {
      console.log(err);
      res.send("error");
      return;
    }
    if (callresult.length<1) {
      res.send("empty");
      return;
    }
    console.log(callresult[0]);
    res.send(callresult[0]);
  });
  return;
});

router.post('/callPrintDetail', function(req,res){
  let studentID = req.body.studentID;
  let year = req.body.year;
  let semester = req.body.semester;
  let callQuery = `call printDetail('${studentID}','${year}','${semester}');`;
  console.log(callQuery);
  con.query(callQuery, function(err, callresult) {
    if (err) {
      console.log(err);
      res.send("error");
      return;
    }
    if (callresult.length<1) {
      res.send("empty");
      return;
    }
    console.log(callresult[0]);
    res.send(callresult[0]);
  });
  return;
});

router.post('/callPrintGrade', function(req,res){
  let studentID = req.body.studentID;
  let year = req.body.year;
  let semester = req.body.semester;

  let callQuery = `call printGrade('${studentID}','${year}','${semester}');`;
  console.log(callQuery);
  con.query(callQuery, function(err, callresult) {
    if (err) {
      console.log(err);
      res.send("error");
      return;
    }
    if (callresult.length<1) {
      res.send("empty");
      return;
    }
    console.log(callresult[0]);
    res.send(callresult[0]);
  });
  return;
});


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

router.get('/admin', function(req, res){
  res.sendfile('./admin.html');
})

router.get('/', function(req, res){
  res.sendfile('./index.html');
})

router.get('/report',function(req,res){
  res.sendfile('./report.html');
});

module.exports = router;
