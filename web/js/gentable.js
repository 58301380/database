var used = [];
var usedResgister = [];
var usedWithdrawn = [];
var retval = [];
var yearSemester = [];
var nowYear = "2018";
var nowSemester = "second";
// var stuID = "5830138021"

$(document).ready(function(){

  $("#WidthdrawnCourseID").on("keyup", function() {
    filterTable("WidthdrawnCourseID","bodyTableWithdrawn",1);});

  $("#studentIDAssignGrade").on("keyup",function() {filterTable("studentIDAssignGrade","assignGradeTable",1)});
  $("#eduOfStuID").on("keyup",function() {filterTable("eduOfStuID","educationStudentTable",1)});

    genTableRegisterStart();
    genTableWithdrawnStart();
    genTableEduHeader();
    genEducationTeacherTable();
    genTranscriptTable();
    genCourseNo();
    genTableAssignGrade();
}); //End document ready

function startFunction(){
  $.get("http://localhost:8080/login/getuserid",function(data,status){
    // var username = data['username'];
    $("#idT").text(data['username']);
  });
}

function genProfile(){
  var teacherID = $('#idT').text();
  var tablehead = ["IDNo","Fname","Lname","TeacherID","Sex","BirthDate","Address","PhoneNo"];
  var buffer = [];
  var rowcount = 0;
  $.post("http://localhost:8080/student/search",{
    item: stdID,
    filter:"TeacherID",
    table: "Teacher natural join Person",
    searchtype: "filter-search"
  },function(data,status){
    // if return data error then drop it and alert
    if (data=='error') {
      alert("query error.");
      return;
    }
    if (data=='empty') {
      return;
    }
  $('#fnameLnameT').text(data[0][tablehead[1]]+' '+data[0][tablehead[2]]);
  $('#sexT').text($('#sexT').text()+data[0][tablehead[4]]);
  $('#birthDateT').text($('#birthDateT').text()+data[0][tablehead[5]].substring(0,10));
  $('#addressT').text($('#addressT').text()+data[0][tablehead[6]]);
  $('#phoneNumberT').text($('#phoneNumberT').text()+data[0][tablehead[7]]);
  $('#transcriptNameT').text($('#fnameLnameT').text());
  })
}
function genProfileCandidate(){
  var candidateID = $('#idC').text();
  var tablehead = ["IDNo","Fname","Lname","CandidateID","Sex","BirthDate","Address","PhoneNo"];
  var buffer = [];
  var rowcount = 0;
  $.post("http://localhost:8080/student/search",{
    item: candidateID,
    filter:"CandidateID",
    table: "Candidate natural join Person",
    searchtype: "filter-search"
  },function(data,status){
    // if return data error then drop it and alert
    if (data=='error') {
      alert("query error.");
      return;
    }
    if (data=='empty') {
      alert("Course Not Found");
      return;
    }
  $('#fnameLnameC').text(data[0][tablehead[1]]+' '+data[0][tablehead[2]]);
  $('#sexC').text($('#sexC').text()+data[0][tablehead[4]]);
  $('#birthDateC').text($('#birthDate'C).text()+data[0][tablehead[5]].substring(0,10));
  $('#addressC').text($('#addressC').text()+data[0][tablehead[6]]);
  $('#phoneNumberC').text($('#phoneNumberC').text()+data[0][tablehead[7]]);
  $('#transcriptNameC').text($('#fnameLnameC').text());
  })
}
function genProfile(){
  var stdID = $('#id').text();
  console.log(stdID);
  var tablehead = ["IDNo","Fname","Lname","StudentID","Sex","BirthDate","Address","PhoneNo"];
  var buffer = [];
  var rowcount = 0;
  $.post("http://localhost:8080/student/search",{
    item: stdID,
    filter:"StudentID",
    table: "Student natural join Person",
    searchtype: "filter-search"
  },function(data,status){
    // if return data error then drop it and alert
    if (data=='error') {
      alert("query error.");
      return;
    }
    if (data=='empty') {
      alert("Course Not Found");
      return;
    }
  $('#fnameLname').text(data[0][tablehead[1]]+' '+data[0][tablehead[2]]);
  $('#sex').text($('#sex').text()+data[0][tablehead[4]]);
  $('#birthDate').text($('#birthDate').text()+data[0][tablehead[5]].substring(0,10));
  $('#address').text($('#address').text()+data[0][tablehead[6]]);
  $('#phoneNumber').text($('#phoneNumber').text()+data[0][tablehead[7]]);
  $('#transcriptName').text($('#fnameLname').text());
  })
}
function insertEnroll(){
  event.preventDefault();
  var stdID = $('#id').text();
  $.post("http://localhost:8080/student/callInsertEnroll",{
    incourseNo: $('#validationCourse').val(),
    inSection: $('#validationSection').val(),
    inStudentID: stdID
  },function(data,status){
    // if return data error then drop it and alert
    console.log('insertEnroll',data);
    if (data=='error') {
      alert("query error.");
      return;
    }
    if (data=='empty') {
      alert("Course Not Found");
      return;
    }
    if (data[0]['Already Enrolled']=='Already Enrolled'){
      alert("Course already registerd!!");
      return;
    }
    else if(data[0]['Already passed this course']=='Already passed this course'){
      alert("Already completed this course.");
      return;
    }
    else if (data[0]['CourseNo or Section is invalid for this semester']=='CourseNo or Section is invalid for this semester') {
      alert("Course or Section invalid.")
      return;
    }
    else{
    alert('Enrolled');
    genTableRegister();
    }
  });
}

function callWithdraw(){
  event.preventDefault();
  var stdID = $('#id').text();
  $.post("http://localhost:8080/student/callwithdraw",{
    incourseNo: $('#WidthdrawnCourseID').val(),
    inStudentID: stdID
  },function(data,status){
    // if return data error then drop it and alert
    console.log('insertEnroll',data);
    if (data=='error') {
      alert("query error.");
      return;
    }
    if (data=='empty') {
      alert("Course Not Found");
      return;
    }
    if (data[0]['Already withdrawn']=='Already withdrawn'){
      alert("Course already withdrawn!!");
      return;
    }
    else if(data[0]['Did not enroll this course']=='Did not enroll this course'){
      alert("You didn't enroll this course.");
      return;
    }
    else if (data[0]['CourseNo is invalid for this semester']=='CourseNo is invalid for this semester') {
      alert("Course or Section invalid.")
      return;
    }
    else{
    alert('Withdrawn!!');
    genTableRegister();
    }
  });
}

function genTableRegisterStart(){
  var stdID = $('#id').text();
  $("#bodyTableRegister").empty();
  var tablehead = ["#","CourseNo","CourseName","Section","Credit","Grade","Yyear","Semester"];
  var rowcount = 0;
  $.post("http://localhost:8080/student/search",{
    item: stdID,
    filter:"StudentID",
    table: "Enroll natural join Course",
    searchtype: "filter-search"
  },function(data,status){
    // if return data error then drop it and alert
    console.log(data);
    if (data=='error') {
      alert("query error.");
      return;
    }
    if (data=='empty') {
      return;
    }
    for(var z=0; z<data.length; z+=1) {
      if (data[z]["Yyear"]===2018 && data[z]["Semester"]==="second" ) {
        // Gen tableRegister
        $("#tableRegister").append(
        '<tr><td id="tr-'+rowcount+'-0"></td>'
          +'<td id="tr-'+rowcount+'-1"></td>'
          +'<td id="tr-'+rowcount+'-2"></td>'
          +'<td id="tr-'+rowcount+'-3"></td>'
          +'<td id="tr-'+rowcount+'-4"></td>'
          +'<td id="tr-'+rowcount+'-5"></td></tr>'
        );

        // loop to change each data cell in blank row
        $('#tr-'+rowcount+'-'+0).html(rowcount+1);
        for(var i=1; i<tablehead.length; i+=1) {
          $('#tr-'+rowcount+'-'+i).html(data[z][tablehead[i]]);
        }
        rowcount +=1;
        }
      }
  });
}
function genTableRegister(){
    event.preventDefault();
    var stdID = $('#id').text();
    $("#bodyTableRegister").empty();
    var tablehead = ["#","CourseNo","CourseName","Section","Credit","Grade","Yyear","Semester"];
    var rowcount = 0;
    $.post("http://localhost:8080/student/search",{
      item: stdID,
      filter:"StudentID",
      table: "Enroll natural join Course",
      searchtype: "filter-search"
    },function(data,status){
      // if return data error then drop it and alert
      console.log(data);
      if (data=='error') {
        alert("query error.");
        return;
      }
      if (data=='empty') {
        alert("Course Not Found");
        return;
      }
      for(var z=0; z<data.length; z+=1) {
        if (data[z]["Yyear"]===2018 && data[z]["Semester"]==="second") {
          // Gen tableRegister
          $("#tableRegister").append(
          '<tr><td id="tr-'+rowcount+'-0"></td>'
            +'<td id="tr-'+rowcount+'-1"></td>'
            +'<td id="tr-'+rowcount+'-2"></td>'
            +'<td id="tr-'+rowcount+'-3"></td>'
            +'<td id="tr-'+rowcount+'-4"></td>'
            +'<td id="tr-'+rowcount+'-5"></td></tr>'
          );

          // loop to change each data cell in blank row
          $('#tr-'+rowcount+'-'+0).html(rowcount+1);
          for(var i=1; i<tablehead.length; i+=1) {
            $('#tr-'+rowcount+'-'+i).html(data[z][tablehead[i]]);
          }
          rowcount +=1;
        }
      }
  });
}

function genTableWithdrawnStart() {
  var stdID = $('#id').text();
  $("#bodyTableWithdrawn").empty();
  var tablehead = ["#","CourseNo","CourseName","Section","Credit"];
  var buffer = [];
  var rowcount = 0;
  $.post("http://localhost:8080/student/search",{
    item: stdID,
    filter:"StudentID",
    table: "Enroll natural join Course",
    searchtype: "filter-search"
  },function(data,status){
    // if return data error then drop it and alert
    console.log(data);
    if (data=='error') {
      alert("query error.");
      return;
    }
    if (data=='empty') {
      return;
    }
    for(var z=0; z<data.length; z+=1) {
      if(data[z]["Yyear"]===2018 && data[z]["Semester"]==="second"){
        // Gen Table Withdrawn
        $("#tableWithdrawn").append(
        '<tr><td id="twd-'+rowcount+'-0"></td>'
          +'<td id="twd-'+rowcount+'-1"></td>'
          +'<td id="twd-'+rowcount+'-2"></td>'
          +'<td id="twd-'+rowcount+'-3"></td>'
          +'<td id="twd-'+rowcount+'-4"></td></tr>'
        );

        // loop to change each data cell in blank row
        $('#twd-'+rowcount+'-'+0).html(rowcount+1);
        for(var i=1; i<tablehead.length; i+=1) {
          $('#twd-'+rowcount+'-'+i).html(data[z][tablehead[i]]);
        }

        rowcount +=1;
      }
    }
  });
}
function genTableWithdrawn() {
    event.preventDefault();
    var stdID = $('#id').text();
    $("#bodyTableWithdrawn").empty();
    var tablehead = ["#","CourseNo","CourseName","Section","Credit"];
    var buffer = [];
    var rowcount = 0;
    $.post("http://localhost:8080/student/search",{
      item: stdID,
      filter:"StudentID",
      table: "Enroll natural join Course",
      searchtype: "filter-search"
    },function(data,status){
      // if return data error then drop it and alert
      console.log(data);
      if (data=='error') {
        alert("query error.");
        return;
      }
      if (data=='empty') {
        alert("Course Not Found");
        return;
      }
      for(var z=0; z<data.length; z+=1) {
        if(data[z]["Yyear"]===2018 && data[z]["Semester"]==="second"){
          // Gen Table Withdrawn
          $("#tableWithdrawn").append(
          '<tr><td id="twd-'+rowcount+'-0"></td>'
            +'<td id="twd-'+rowcount+'-1"></td>'
            +'<td id="twd-'+rowcount+'-2"></td>'
            +'<td id="twd-'+rowcount+'-3"></td>'
            +'<td id="twd-'+rowcount+'-4"></td></tr>'
          );

          // loop to change each data cell in blank row
          $('#twd-'+rowcount+'-'+0).html(rowcount+1);
          for(var i=1; i<tablehead.length; i+=1) {
            $('#twd-'+rowcount+'-'+i).html(data[z][tablehead[i]]);
          }

          rowcount +=1;
        }
      }
  });
}

// function withdrawnOperation() {
//         var value = $("#WidthdrawnCourseID").val().toLowerCase();
//         $("#bodyTableWithdrawn tr").filter(function() {
//           $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
//           if($(this).text().toLowerCase().indexOf(value) > -1){
//             if(retval.indexOf($(this).text()[0])>-1) {alert("Course : No."+$(this).text()[0]+" is already Withdrawn");return;}
//               retval.push($(this).text()[0]);
//               $(this).remove();
//           }
//         });
//       return retval;
// }

function genTableEduHeader(){
  // event.preventDefault();
  // $("#eduResTable").empty();
  var stdID = $('#id').text();
  var tablehead = ["Yyear","Semester"];
  var buffer = [];
  $.post("http://localhost:8080/student/callOverviewCourse",{
    studentID: stdID
  },function(data,status){
    // if return data error then drop it and alert
    if (data=='error') {
      alert("query error.");
      return;
    }
    if (data=='empty') {
      alert("Education Result Not Found");
      return;
    }
    for(var z=0; z<data.length; z+=1) {
        // Gen tableRegister
        $("#eduResTable").append('<table id="tableWithdrawn" class="table table-hover"> \
        <h4 class="mt-5" style="text-align:left;">Semester '+data[z][tablehead[1]]+' Year '+data[z][tablehead[0]]+'<h4> \
        <thead> \
          <tr> \
            <th>Course No</th> \
            <th>Course Name</th>\
            <th>Credit</th>\
            <th>Grade</th>\
          </tr>\
        </thead>\
        <tbody id="eduResultTable'+z+'">\
        </tbody>\
          </table>')

          yearSemester.push(data[z][tablehead[0]]);
          yearSemester.push(data[z][tablehead[1]]);
      }
      genTableEduContent();
      genTranscriptTable();
  });
}
function genTableEduContent(){
  var stdID = $('#id').text();
  var tablehead = ["CourseNo","CourseName","Credit","Grade"];
  var tablehead1 = ["Credit","Cumulative Credit","GPA","GPAX"];
  var buffer = [];
  var num = 0;
  for(var i=0;i<yearSemester.length;i+=2){
  $.post("http://localhost:8080/student/callPrintDetail",{
    studentID: stdID,
    year: yearSemester[i],
    semester: yearSemester[i+1]
  },function(data,status){
    // if return data error then drop it and alert
    if (data=='error') {
      alert("query error.");
      return;
    }
    if (data=='empty') {
      alert("Education Result Not Found");
      return;
    }
    num+=1;
    for(var z=0; z<data.length; z+=1) {
        // Gen tableRegister
        $("#eduResultTable"+(num-1)).append('<tr><td>'+data[z][tablehead[0]]+'</td>\
                               <td>'+data[z][tablehead[1]]+'</td>\
                               <td>'+data[z][tablehead[2]]+'</td>\
                               <td>'+data[z][tablehead[3]]+'</td></tr>');
      }
    });
    $.post("http://localhost:8080/student/callPrintGrade",{
      studentID: stdID,
      year: yearSemester[i],
      semester: yearSemester[i+1]
    },function(data,status){
      // if return data error then drop it and alert
      if (data=='error') {
        alert("query error.");
        return;
      }
      if (data=='empty') {
        alert("Education Result Not Found");
        return;
      }
      for(var z=0; z<data.length; z+=1) {
    $('#creditEarn').text(data[z][tablehead1[1]]);
     $("#eduResultTable"+(num-1)).after('<thead>\
                                  <tr style=" border-bottom-style: solid;border-bottom-width: 1px;border-bottom-color: rgb(221, 221, 221);line-height: 17px;background-color: rgba(237, 159, 40, 0.19);">\
                                     <th scope="col">CA<div style="font-weight:normal;">'+data[z][tablehead1[0]]+'</div></th>\
                                     <th scope="col">GPA<div style="font-weight:normal;">'+data[z][tablehead1[2]]+'</div></th>\
                                     <th scope="col">CAX<div style="font-weight:normal;">'+data[z][tablehead1[1]]+'</div></th>\
                                     <th scope="col">GPAX<div style="font-weight:normal;">'+data[z][tablehead1[3]]+'</div></th>\
                                   </tr>\
                                   </thead>');
        }
      });
  }
}

function genTableAssignGrade(){
  $("#assignGradeTable").append('<tr><td>1</td>\
                         <td>5830138021</td>\
                         <td>1</td>\
                         <td>3.5</td></tr>');
}
function genCourseNo(){
  var teacherID = "0021358021";
  var tablehead = ["studentID","Section","Grade"];
  $.post("http://localhost:8080/student/callTeacherTeachCourse",{
    inteacherID: teacherID,
  },function(data,status){
    // if return data error then drop it and alert
    if (data=='error') {
      alert("query error.");
      return;
    }
    if (data=='empty') {
      alert("Teach Course Not Found");
      return;
    }
    console.log(data[0]['courseNo']);
    for(var z=0; z<data.length; z+=1) {
        // Gen tableRegister
        $('inputGroupSelect').append('<option value='+data[0]['courseNo']+'>'+data[0]['courseNo']+'</option>')
      }
    });
}

function genEducationTeacherTable(){
  var teacherID = "0021358021";
  var tablehead = ["studentID","Fname","Lname","GPAX"];
  $.post("http://localhost:8080/student/callstudentAdvise",{
    inteacherID: teacherID,
  },function(data,status){
    // if return data error then drop it and alert
    if (data=='error') {
      alert("query error.");
      return;
    }
    if (data=='empty') {
      alert("Education Result of Student Not Found");
      return;
    }
    console.log(data);
    for(var z=0; z<data.length; z+=1) {
        // Gen tableRegister
        $("#educationStudentTable").append('<tr><td>'+z+1+'</td>\
                               <td>'+data[z][tablehead[0]]+'</td>\
                               <td>Natchaphon</td>\
                               <td>Suphatarawanich</td>\
                               <td>'+data[z][tablehead[3]]+'</td></tr>');
      }
    });
}

function genTranscriptTable(){
  var tablehead = ["CourseNo","CourseName","Credit","Grade"];
  var buffer = [];
  var num = 0;
  var enrollCount = 0;
  var completedCount = 0;
  var stdID = $('#id').text();
  for(var i=0;i<yearSemester.length;i+=2){
  $.post("http://localhost:8080/student/callPrintDetail",{
    studentID: stdID,
    year: yearSemester[i],
    semester: yearSemester[i+1]
  },function(data,status){
    // if return data error then drop it and alert
    if (data=='error') {
      alert("query error.");
      return;
    }
    if (data=='empty') {
      alert("Education Result Not Found");
      return;
    }
    for(var z=0; z<data.length; z+=1) {
        // Gen tableRegister
        enrollCount++;
        var term = "1";
        if (yearSemester[num*2+1] == "second"){ term = "2";}
        if (yearSemester[num*2] == nowYear && term=="2"){
        $("#progressTable").append('<tr><td class="borderless">'+term+'/'+yearSemester[num*2]+'</td>\
                               <td class="borderless">'+data[z][tablehead[0]]+'</td>\
                               <td class="borderless">'+data[z][tablehead[1]]+'</td>\
                               <td class="borderless">'+data[z][tablehead[2]]+'</td></tr>');
        }else{
          completedCount++;
        $("#completedTable").append('<tr><td class="borderless">'+term+'/'+yearSemester[num*2]+'</td>\
                               <td class="borderless">'+data[z][tablehead[0]]+'</td>\
                               <td class="borderless">'+data[z][tablehead[1]]+'</td>\
                               <td class="borderless">'+data[z][tablehead[2]]+'</td></tr>');
        }
      }
      $('#enrolled').text(enrollCount);
      $('#completed').text(completedCount);
      $('#inprogress').text(enrollCount-completedCount);
      num+=1;
    });
  }
}

function filterTable(inputVal,tableVal,column) {
  // Declare variables
  var input, filter, table, tr, td, i;
  input = document.getElementById(inputVal);
  filter = input.value.toUpperCase();
  table = document.getElementById(tableVal);
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}
