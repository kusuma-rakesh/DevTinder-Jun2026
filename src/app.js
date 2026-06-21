const express = require("express");
const app = express();
const user = {
  name: "Rakesh Kusuma",
  age: 38,
  gender: "Male",
  Working: "Yes",
  companyName: "AICS",
};

app.get("/user", (req, res) => {
  console.log(req.query);

  res.send(req.query.name);
});
app.get("/user", (req, res) => {
  res.send(user);
});
app.post("/user/:id/:name", (req, res) => {
  console.log(req.params);

  res.send(`Id:${req.params.id} `);
  //   res.send(`Id:${req.params.id} -- Name: ${req.params.name} `);
});

app.post("/user", (req, res) => {
  console.log("Data saved successfully..!!");
  res.send("POST - Data saved successfully..!!!!");
});

app.put("/user", (req, res) => {
  console.log("Data partially saved..!!");
  res.send("PUST - Data partially saved..!!!!");
});

app.delete("/user", (req, res) => {
  console.log("Data deleted successfully");
  res.send("DELETE: Data deleted successfully..!!");
});

app.get("/employee", (req, res) => {
  console.log(req.query);
  console.log(req.method);
  console.log(req.params);
  console.log(req.body);
  console.log(req.url);

  res.send(req.query);
});
app.use("/", (req, res) => {
  res.send("Hello Rakesh Kusuma - App.Use");
});

app.listen(7777, () => {
  console.log("server is running on port > 7777");
});
