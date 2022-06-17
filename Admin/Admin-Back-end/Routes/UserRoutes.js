const router = require("express").Router();
const User = require("../models/User");
var id = 0;

router.post("/AddUser", async (req, res) => {
  try {
    const newUser = new User({
      id: ++id,
      fullname: req.body.fullname,
      username: req.body.username,
      phone: req.body.phone,
      email: req.body.email,
      password: req.body.password,
      profilePic: req.body.profilePic,
      isAdmin: req.body.isAdmin,
    });

    const addedUser = await newUser.save();

    if (addedUser) {
      res.status(201).json(newUser);
    } else {
      res.status(401).json("Invalid Register !!");
      console.log("error in Adding User");
    }
  } catch (error) {
    res.status(500).json("Invalid Register !! User is existed...");
    console.log(error);
  }
});

router.get("/Users", async (req, res) => {
  try {
    const AllUsers = await User.find();
    if (AllUsers) {
      res.json(AllUsers);
    } else {
      res.json("No Users existed");
    }
  } catch (error) {
    res.status(500).json("No Users existed...");
    console.log(error);
  }
});

router.put("/User/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.json("Inavlaid Update !! User not existed");
    }
  } catch (error) {
    res.status(500).json("Inavlaid Update !! User not existed...");
    console.log(error);
  }
});

router.get("/Users/:id", async (req, res) => {
  try {
    const existUser = await User.findById(req.params.id);
    if (existUser) {
      res.status(200).json(existUser);
      console.log(existUser);
    } else {
      res.json("invlid Get !! User not existed");
      console.log("Error");
    }
  } catch (err) {
    res.status(500).json("invlid Get !! User not existed...");
    console.log(err);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (deletedUser) {
      res.status(200).json(deletedUser);
    } else {
      res.json("invlid Delete !! User not existed");
    }
  } catch (err) {
    res.status(500).json("invlid Delete !! User not existed...");
    console.log(err);
  }
});
module.exports = router;
