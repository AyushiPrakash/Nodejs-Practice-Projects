const express = require("express");
const mysql = require("mysql");
const { dirname } = require("path");
const app = express();
const bodyparser = require("body-parser");
const { userInfo } = require("os");

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
  // res.sendFile(__dirname + "/" + "style.css");
});

app.post("/addUser", (req, res) => {
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let regNumber = req.body.regNumber;
  // INSERT INTO table name(column1, column2, column3) VALUES(value1, value2.....)
  let query =
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

app.post("/updateUser", (req, res) => {
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let regNumber = req.body.regNumber;
  let newFirstName = req.body.newFirstName;
  let newLastName = req.body.newLastName;
  let newRegNumber = req.body.newRegNumber;

  let query = `UPDATE userinfo SET firstName = "${newFirstName}" , lastName = "${newLastName}" , regNumber = ${newRegNumber} WHERE firstName = "${firstName}" AND lastName = "${lastName}" AND regNumber = ${regNumber} `;

  con.query(query, (err, result) => {
    if (err) {
      console.log(err.sql);
      console.log(err.message);
      res.send(err.message);
    } else {
      console.log("Data Updated!");
      res.send({
        status: 200,
        message: "Data is Updated.",
      });
    }
  });
});

app.post("/deleteUser",(req,res)=>{
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let regNumber = req.body.regNumber;

  let query = `DELETE FROM userinfo WHERE firstName = "${firstName}" AND lastName = "${lastName}" AND regNumber = ${regNumber} `;

  con.query(query, (err, result) => {
    if (err) {
      // console.log(err.sql);
      console.log(err.message);
      res.send(err.message);
    } else {
      console.log("Data Deleted!");
      res.send({
        status: 200,
        message: "Data is Deleted.",
      });
    }
  });

});


const PORT = 6001;
app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
