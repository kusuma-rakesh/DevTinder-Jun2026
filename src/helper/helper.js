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

module.exports = { validateUser, sanitizeData };
