// const mongoose = require("mongoose");
// const userSchema = new mongoose.Schema({
//   firstName: { type: String },
//   lastName: { type: String },
//   email: { type: String },
//   password: { type: String },
//   age: { type: Number },
//   denger: { type: String },
// });

// const User = mongoose.model("User", userSchema);

// module.exports = { User };

class User {
  constructor({
    firstName,
    lastName,
    email,
    password,
    age,
    gender,
    about,
    skills,
  }) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.age = age;
    this.gender = gender;
    this.about = about;
    this.skills = skills;

    const now = new Date();

    this.createdAt = now;
    this.updatedAt = now;
  }
}
module.exports = { User };
