const express = require("express");
const { isAdminAuth } = require("./middlewares/auth.js");
const app = express();

app.use("/admin", isAdminAuth);
app.get("/admin/getAllUsers", (req, res) => {
  res.send("getAllUsers Data..");
});
app.get("/admin/addUser", (req, res) => {
  res.send("Im adding a user");
});
app.get("/admin/deleteUser", (req, res) => {
  res.send("Im deleting a user");
});

app.listen(7777, () => {
  console.log("Application is listening on port:7777");
});
