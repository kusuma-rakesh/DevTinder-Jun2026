const express = require("express");
const app = express();

app.get(
  "/user",
  (req, res, next) => {
    console.log("route handler-1");
    // res.send("route handler-1");
    next();
  },
  (req, res, next) => {
    console.log("route handle-2");
    // res.send("route handle-2");
    next();
  },
  (req, res, next) => {
    console.log("request handler-3");
    // res.send("request handler-3");
    next();
  },
);
app.use("/", (req, res) => {
  console.log("Hello Rakesh Kusuma");
  res.send("Learning Homepage");
});
app.listen(7777, () => {
  console.log("server running at http://127.0.0.1:7777");
});
