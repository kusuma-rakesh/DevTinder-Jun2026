const express = require("express");
const app = express();
app.use(express.json());
const { conn, database, db_collection } = require("./config/database.js");
const { User } = require("./models/user.js");
const { validateUser, sanitizeData } = require("./helper/helper.js");
const { log } = require("node:console");
const { ObjectId } = require("mongodb");
const validator = require("validator");

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
      validateUser(req.body);
      const userObj = new User(sanitizeData(req.body));
      if (!validator.isEmail(userObj.email)) {
        throw new Error("Email is Invalid");
      }
      userCollection.insertOne(userObj).then(() => {
        res.send("Inserted document to user");
      });
    });
  } catch (err) {
    res.status(401).send("error occured while saving the user");
  }

  try {
    app.get("/feed", (req, res) => {
      userCollection
        .find({})
        .toArray()
        .then((result) => {
          res.send(result);
        });
    });
  } catch (err) {
    res.status(401).send("error occured while saving the user");
  }

  //find a user using email
  try {
    app.get("/user", (req, res) => {
      const user = req.body.email;

      userCollection
        .findOne({ email: req.body.email })
        // .toArray()
        .then((result) => {
          if (!result) {
            res.status(404).send("user not found...!");
          } else {
            res.send(result);
          }
        });
    });
  } catch (err) {
    res.status(401).send("error occured while saving the user");
  }

  //find and delete a user from collection
  try {
    app.delete("/user", (req, res) => {
      const userid = new ObjectId(req.body.userid); //important --ObjectId comes from Import
      userCollection.findOneAndDelete({ _id: userid }).then((result) => {
        console.log(`user deleted successfully with _id = ${req.body.userid}`);
        res.redirect("/feed");
      });
    });
  } catch (err) {
    res.status(401).send("error occured while saving the user");
  }

  //find and delete a user from collection
  try {
    app.patch("/user", (req, res) => {
      const userid = new ObjectId(req.body.userid); //important --ObjectId comes from Import
      const updateData = {};
      if (req.body.firstName !== undefined)
        updateData.firstName = req.body.firstName;
      if (req.body.lastName !== undefined)
        updateData.lastName = req.body.lastName;
      if (req.body.gender !== undefined) updateData.gender = req.body.gender;
      if (req.body.skills !== undefined) updateData.skills = req.body.skills;
      if (req.body.about !== undefined) updateData.about = req.body.about;

      //   const ALLOWED_UPDATES = [firstName, lastName, skills, about];
      //   const isUpdateAllowd = Object.keys(data).every((k) => {
      //     ALLOWED_UPDATES.includes(k);
      //   });
      //   if (!isUpdateAllowd) {
      //     throw new Error("Updates Not Allow");
      //   }
      if (updateData.skills.length > 10) {
        throw new Error("Skills cannot be more than 10");
      }
      userCollection
        .findOneAndUpdate(
          { _id: userid },
          {
            $set: updateData,
          },
        )
        .then((result) => {
          console.log(
            `user updated successfully with _id = ${req.body.userid}`,
          );
          res.redirect("/feed");
        });
    });
  } catch (err) {
    res.status(40).send("error occured while saving the user" + err.message);
  }

  app.listen(7777, () => {
    console.log("application was listening on port 7777");
  });
});
