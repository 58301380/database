var used = [];
var usedResgister = [];
var usedWithdrawn = [];
var retval = [];
var yearSemester = [];
var nowYear = "2018";
var nowSemester = "second";

$(document).ready(function(){

  $("#withdrawnBtn").click(function(){
    event.preventDefault();
      // function Check used
      if(usedWithdrawn.indexOf($("#WidthdrawnCourseID").val())>-1) {alert("Data already withdrawn");return;}
      alert("Withdrawn course success");
      withdrawnOperation();
      genTableRegister();
      genTableWithdrawn()
        //need change W function !!!!!
        usedWithdrawn.push($("#WidthdrawnCourseID").val());

  });

  $("#WidthdrawnCourseID").on("keyup", function() {
    filterTable("WidthdrawnCourseID","bodyTableWithdrawn",1);});

  $("#studentIDAssignGrade").on("keyup",function() {filterTable("studentIDAssignGrade","assignGradeTable",1)});
  $("#eduOfStuID").on("keyup",function() {filterTable("eduOfStuID","educationStudentTable",1)});

  // genProfile()
  // genTableEduHeader();
  // genEducationTeacherTable();
  // genTranscriptTable("completed");
  // genTranscriptTable("progressTable");
}); //End document ready

function startFunction(){
  $.get("http://localhost:8080/login/getuserid",function(data,status){
    // var username = data['username'];
    $("#id").text(data['username']);
    // console.log(username);
    // document.getElementById('id').innerHTML = username;
  });
}

function genProfile(){
  $("#bodyTableRegister").empty();
  var stdID = $('#id').text();
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
    console.log(data);
    if (data=='error') {
      alert("query error.");
      return;
    }
    if (data=='empty') {
      alert("Course Not Found");
      return;
    }
  })
}

function genTableRegister(){
    event.preventDefault();
    var stdID = $('#id').text();
    $("#bodyTableRegister").empty();
    var tablehead = ["#","CourseNo","CourseName","Section","Credit","Grade"];
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

        var exist = true;
        // if not 'all member of object data[z] already in table'
        for(var x=0; x<buffer.length; x+=1) {
          if (buffer[x] != data[z]["StudentID"]) exist = false;
        }

        // if no any object in buffer that mean nothing has ever in table
        if (buffer.length<1) exist = false;

        if (!exist) {
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
          $('#tr-'+rowcount+'-'+0).html(z+1);
          for(var i=1; i<tablehead.length; i+=1) {
            $('#tr-'+rowcount+'-'+i).html(data[z][tablehead[i]]);
          }

          // push to buffer to memorize it already in table
          buffer.push(data[z][tablehead[0]]);
          rowcount +=1;
        }
        else {
            alert("Course already register.");
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

        var exist = true;
        // if not 'all member of object data[z] already in table'
        for(var x=0; x<buffer.length; x+=1) {
          if (buffer[x] != data[z]["StudentID"]) exist = false;
        }

        // if no any object in buffer that mean nothing has ever in table
        if (buffer.length<1) exist = false;

        if (!exist) {
          // Gen Table Withdrawn
          $("#tableWithdrawn").append(
          '<tr><td id="twd-'+rowcount+'-0"></td>'
            +'<td id="twd-'+rowcount+'-1"></td>'
            +'<td id="twd-'+rowcount+'-2"></td>'
            +'<td id="twd-'+rowcount+'-3"></td>'
            +'<td id="twd-'+rowcount+'-4"></td></tr>'
          );

          // loop to change each data cell in blank row
          $('#twd-'+rowcount+'-'+0).html(z+1);
          for(var i=1; i<tablehead.length; i+=1) {
            $('#twd-'+rowcount+'-'+i).html(data[z][tablehead[i]]);
          }

          // push to buffer to memorize it already in table
          buffer.push(data[z][tablehead[0]]);
          rowcount +=1;
        }
        else {
            alert("Course already register.");
        }
      }
  });
}

function withdrawnOperation() {
        var value = $("#WidthdrawnCourseID").val().toLowerCase();
        $("#bodyTableWithdrawn tr").filter(function() {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
          if($(this).text().toLowerCase().indexOf(value) > -1){
            if(retval.indexOf($(this).text()[0])>-1) {alert("Course : No."+$(this).text()[0]+" is already Withdrawn");return;}
              retval.push($(this).text()[0]);
              $(this).remove();
          }
        });
      return retval;
}

function genTableEduHeader(){
  // event.preventDefault();
  // $("#eduResTable").empty();
  var stdID = $('#id').text();
  console.log('bin',stdID);
  var tablehead = ["Yyear","Semester"];
  var buffer = [];
  $.post("http://localhost:8080/student/callOverviewCourse",{
    studentID: stdID
  },function(data,status){
    // if return data error then drop it and alert
    console.log(data);
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
      genTranscriptTable("completedTable");
  });
}
function genTableEduContent(){
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
      console.log(data);
      if (data=='error') {
        alert("query error.");
        return;
      }
      if (data=='empty') {
        alert("Education Result Not Found");
        return;
      }
      for(var z=0; z<data.length; z+=1) {
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
  event.preventDefault();
  var StudentID= 5831001;
  var Section= 33;
  var Grade= "-";
  for(var i=1;i<4;i++){
  $('#assignGradeTable').append(`<tr><td>${i}</td>\
                         <td>${StudentID}</td>\
                         <td>${Section}</td>\
                         <td>${Grade}</td></tr>
                         <td>${i}</td>\
                        <td>9999999</td>\
                        <td>${Section}</td>\
                        <td>${Grade}</td></tr>`);
  }
}

function genEducationTeacherTable(){
  var no =1;
  var StudentID= 5831001;
  var Section= 33;
  var Grade= "-";

  $('#educationStudentTable').append(`<tr>\
                                  <td>1</td>\
                                  <td>1101201493</td>\
                                  <td>Anna</td>\
                                  <td>Pitt</td>\
                                  <td>4.00</td>\
                                </tr>\
                                <tr>\
                                  <td>2</td>\
                                  <td>1101201123</td>\
                                  <td>mit</td>\
                                  <td>Pitt</td>\
                                  <td>3.00</td>\
                                </tr>\
                                <tr>\
                                  <td>3</td>\
                                  <td>1101201123</td>\
                                  <td>IMBA</td>\
                                  <td>Pitt</td>\
                                  <td>3.10</td>\
                                </tr>`);
}
function genTranscriptTable(table){
  var tablehead = ["CourseNo","CourseName","Credit","Grade"];
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
    console.log(data[0][tablehead[0]]);
    for(var z=0; z<data.length; z+=1) {
        // Gen tableRegister
        var term = "1";
        if (yearSemester[num*2+1] == "second"){ term = "2";}
        $("#"+table).append('<tr><td class="borderless">'+term+'/'+yearSemester[num*2]+'</td>\
                               <td class="borderless">'+data[z][tablehead[0]]+'</td>\
                               <td class="borderless">'+data[z][tablehead[1]]+'</td>\
                               <td class="borderless">'+data[z][tablehead[2]]+'</td></tr>');
      }
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
