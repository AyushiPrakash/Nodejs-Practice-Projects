const express = require("express");
const mysql = require("mysql");
const { dirname } = require("path");
const app = express();
const bodyparser = require("body-parser");

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "newDatabase",
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/" + "demo.html");
});

app.post("/addUser", (req, res) => {
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var regNumber = req.body.regNumber;
  // INSERT INTO table name(column1, column2, column3) VALUES(value1, value2.....)
  var query =
    'INSERT INTO userinfo (firstName, lastName, regNumber) VALUES (" ' +
    firstName +
    ' " , " ' +
    lastName +
    ' " , " ' +
    regNumber +
    ' ")';

  con.query(query, (err, result) => {
    if (err) {
      console.log(err.sql);
      console.log(err.message);
      res.send(err.message);
    } else {
      console.log("Data is entered!");
      res.send({
        status: 200,
        message: "Data is entered.",
      });
    }
  });
});

const PORT = 6001;
app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});


