const express = require("express");
const { dirname } = require("path");
const app = express();
const bodyparser = require("body-parser");

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/" + "file.html");
});

app.post("/sendData", (req, res) => {
  console.log(req.body.message);
  res.send("The data is sent back");
});

app.put("/updateData", (req, res) => {
  res.send("The data is updated");
});

app.delete("/deleteData", (req, res) => {
  res.send("The data is deleted");
});

app.listen(8080, () => {
  console.log("Server is running on port 8080!");
});
