const express = require("express");
const app = express();
app.use("/", (req, res, next) => {
  console.log("Hello Rakesh Kusuma");
  //   res.send("Learning Homepage");
  next();
});

app.get(
  "/user",
  (req, res, next) => {
    console.log("route handler-1");
    //res.send("route handler-1");
    next();
  },
  //   (req, res, next) => {
  //     console.log("route handle-2");
  //     // res.send("route handle-2");
  //     next();
  //   },
  //   (req, res, next) => {
  //     console.log("request handler-3");
  //     // res.send("request handler-3");
  //     next();
  //   },
);
app.get("/user", (req, res, next) => {
  console.log("Route handler-2");
  res.send("route handler-2");
  next();
});

app.listen(7777, () => {
  console.log("server running at http://127.0.0.1:7777");
});
