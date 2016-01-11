var express = require('express');

var bodyParser = require('body-parser');

var students = [{
   fName: "Bob",
   lName: "Thabuilder",
   email: "bob@hotmail.com",
   password: "canWeFixIt"
}, {
   fName: "Wayne",
   lName: "Bruce",
   email: "notbatman@gmail.com",
   password: "nananananananana"
}, {
   fName: "Ex",
   lName: "Ample",
   email: "example@example.com",
   password: "testing123"
}];

var scores = [{
   email: "bob@hotmail.com",
   test1: 76,
   test2: 89,
   test3: null
}, {
   email: "notbatman@gmail.com",
   test1: 90,
   test2: 73,
   test3: 81
}, {
   email: "example@example.com",
   test1: 67,
   test2: null,
   test3: null
}];

var app = express();

app.use(express.static('public'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


app.get('/', function (req, res) {
   res.sendFile('index.html');
})

app.get('/getDetails', function (req, res) {

   // Prepare output in JSON format
   console.log("Getting Details");
   console.log(req.query.email);

   var response = "<h3>Response!</h3><ul>";

   for (i = 0; i < students.length; i++) {
      if (students[i].email == req.query.email) {
         response += "<li>First Name:" + students[i].fName + "</li>";
         response += "<li>Last Name:" + students[i].lName + "</li>";
         response += "<li>Password:" + students[i].password + "</li>";
      }
   }

   for (i = 0; i < scores.length; i++) {
      if (scores[i].email == req.query.email) {
         if (scores[i].test1 != null) {
            response += "<li>Test 1 : " + scores[i].test1 + "</li>";
         }
         if (scores[i].test2 != null) {
            response += "<li>Test 2 : " + scores[i].test2 + "</li>";
         }
         if (scores[i].test3 != null) {
            response += "<li>Test 3 : " + scores[i].test3 + "</li>";
         }
      }
   }
   response += "</ul>";
   res.send(response);
});

app.post('/updateMarks', function (req, res) {

   console.log(req.body);
   console.log(req.body.test2);
   console.log(req.body.test3);

   var response = "<h3>Response!</h3><ul>";

   for (i = 0; i < students.length; i++) {
      if (scores[i].email == req.body.email) {
         response += "<li>First Name:" + students[i].fName + "</li>";
         response += "<li>Last Name:" + students[i].lName + "</li>";
         response += "<li>Password:" + students[i].password + "</li>";
      }
   }

   for (i = 0; i < scores.length; i++) {
      if (scores[i].email == req.body.email) {
         if (req.body.test1 != null) {
            scores[i].test1 = req.body.test1;
         }
         if (req.body.test2 != null) {
            scores[i].test2 = req.body.test2;
         }
         if (req.body.test3 != null) {
            scores[i].test3 = req.body.test3;
         }


         if (scores[i].test1 != null) {
            response += "<li>Test 1 : " + scores[i].test1 + "</li>";
         }
         if (scores[i].test2 != null) {
            response += "<li>Test 2 : " + scores[i].test2 + "</li>";
         }
         if (scores[i].test3 != null) {
            response += "<li>Test 3 : " + scores[i].test3 + "</li>";
         }
      }
   }

   console.log(response);
   response += "</ul>";
   res.send(response);
});



var server = app.listen(8088, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

});


