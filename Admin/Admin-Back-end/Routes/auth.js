const router = require("express").Router();
const User = require("../models/User");

router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    isAdmin: req.body.isAdmin,
  });

  try {
    if (newUser) {
      const user = newUser;
      console.log(newUser.username, newUser.email, newUser.password);
    } else {
      res.status(401).json("Invalid Register !!");
      console.log("error in User");
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });

    user
      ? res.status(200).json(user)
      : res.status(401).json("Invalid Login !!");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
