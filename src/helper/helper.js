const { error } = require("node:console");
const validator = require("validator");

function validateUser(user) {
  const requiredFields = ["firstName", "lastName", "email", "password"];
  for (const field of requiredFields) {
    if (!user[field]) {
      throw new Error(`${field} is required`);
    }
  }
}

function sanitizeData(user) {
  return {
    ...user,
    firstName: user.firstName?.trim(),
    lastName: user.lastName?.trim(),
    email: user.email?.trim().toLowerCase(),
    about: user.about?.trim() || "This is a default about",
  };
}

function validateSingupData(req) {
  const { firstName, lastName, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Please enter first and lastnames correctly");
  } else if (firstName.length < 4 || firstName.length > 50) {
    throw new Error("Invalid firstname...");
  } else if (lastName < 4 || lastName.length > 50) {
    throw new Error("Invalid Lastname...");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong");
  }
}

module.exports = { validateUser, sanitizeData, validateSingupData };
