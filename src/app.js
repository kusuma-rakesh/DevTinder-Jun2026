const express = require("express");
const app = express();
app.use(express.json());
const { conn, database, db_collection } = require("./config/database.js");
const { User } = require("./models/user.js");
const {
  validateUser,
  sanitizeData,
  validateSingupData,
} = require("./helper/helper.js");
const { log } = require("node:console");
const { ObjectId } = require("mongodb");
const validator = require("validator");
const { emit } = require("node:cluster");
const bcrypt = require("bcrypt");
let encryptedPwd;
let userDetails;
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

  app.post("/signup", (req, res) => {
    try {
      validateSingupData(req);
      const { firstName, lastName, email, password, skills, gender, age } =
        req.body;
      bcrypt
        .hash(password, 10)
        .then((encryptpwd) => {
          const userObj = new User(
            sanitizeData({
              firstName,
              lastName,
              email,
              password: encryptpwd,
              skills,
              gender,
              age,
            }),
          );
          return userCollection.insertOne(userObj);
        })
        .then(() => {
          res.send("Inserted document to user");
        });
    } catch (err) {
      res.status(500).send("ERROR1: " + err.message);
    }
  });

  app.post("/login", (req, res) => {
    try {
      const { email, password } = req.body;
      userCollection.findOne({ email: email }).then((result) => {
        if (!result) {
          throw new Error("Invlaid credentials");
        } else {
          const pwd = result.password;
          console.log(pwd, password);

          bcrypt.compare(password, pwd).then((resp) => {
            if (!resp) {
              res.send("Failed..!");
            } else {
              res.send("user Logged In Successfully..!");
            }
          });
        }
      });
    } catch (err) {
      res.status(500).send("ERROR1: " + err.message);
    }
  });

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
