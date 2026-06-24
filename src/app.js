const express = require("express");
const app = express();
app.use(express.json());
const { conn, database, db_collection } = require("./config/database.js");
const { User } = require("./models/user.js");
conn.then((obj) => {
  const db = obj.db(database);
  const userCollection = db.collection("User");
  //   const userObj = new User({
  //     firstName : "Sachin",
  //     lastName : "Tendulkar",
  //     email : "sachin@gmail.com",
  //     password : "password123",
  //     age : 42,
  //     gender : "Male",
  // });

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

  //get the data dynamically instead of hardcoding like above

  console.log(`Connected to database ${database} ${db_collection}`);
  try {
    app.post("/signup", (req, res) => {
      console.log(req.body);
      const userObj = new User(req.body);
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
