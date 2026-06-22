const token = "password1";

const isAdminAuth = (req, res, next) => {
  const isAuth = token === "password12";
  if (!isAuth) {
    res.status(401).send("Not an authorized user..!!");
  } else {
    console.log("user is authorized");
    next();
  }
};

module.exports = {
  isAdminAuth,
};
