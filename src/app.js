const express = require("express");
const app = express();
const { conn, database, db_collection } = require("./config/database.js");
const { User } = require("./models/user.js");
conn.then((obj) => {
  const db = obj.db(database);
  const userCollection = db.collection("User");
  const userObj = new User(
    "Akshay",
    "Saini",
    "Akshay@teach.com",
    "abcd@123",
    35,
    "Male",
  );
  //   const userObj = {
  //     firstName: "Rakesh",
  //     lastName: "Kusuma",
  //     gender: "Male",
  //     age: 38,
  //     email: "rakesh.md@gmail.com",
  //     pwd: "abcd@123",
  //   };
  //   db.collection(db_collection)
  //     .find({})
  //     .toArray()
  //     .then((res) => {
  //       console.log(res);
  //     });

  console.log(`Connected to database ${database} ${db_collection}`);
  try {
    app.post("/signup", (req, res) => {
      userCollection.insertOne(userObj).then(() => {
        res.send("Inserted document to user");
      });
    });
  } catch (err) {
    res.status(401).send("error occured while saving the user");
  }

  app.listen(7777, () => {
    console.log("application was listening on port 7777");
  });
});
