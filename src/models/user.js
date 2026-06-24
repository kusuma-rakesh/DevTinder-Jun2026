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
  constructor({ firstName, lastName, email, password, age, gender }) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.age = age;
    this.gender = gender;
  }
}
module.exports = { User };
