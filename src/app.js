const express = require("express");
const app = express();

app.use("/test", (req, res) => {
  res.send("Navigate to test page...!");
});
app.use("/practice", (req, res) => {
  res.send("Navigate to practie page...!");
});
app.use("/hello/2", (req, res) => {
  res.send("Hello Rakesh Kusuma - 2");
});

app.use("/hello/3", (req, res) => {
  res.send("Hello Rakesh Kusuma - 3");
});
app.use("/hello", (req, res) => {
  res.send("Hello Rakesh Kusuma - 1");
});
app.use("/", (req, res) => {
  res.send("welcome to homepage");
});
app.listen(7777, () => {
  console.log("Server listening at 7777...");
});
