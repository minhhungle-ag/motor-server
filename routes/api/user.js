const express = require("express");
const User = require("../models/user");
const { Types } = require("mongoose");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const userList = await User.find();

    res.status(200).json({
      message: "Get success",
      data: userList || [],
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: error.message,
    });
  }
});

router.get("/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId);
    res.status(200).json({
      message: "Get success",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: {
        message: error.message,
      },
    });
  }
});

router.post("/", (req, res) => {
  const user = new User({
    _id: new Types.ObjectId(),
    info: {
      name: req.body.name,
      age: req.body.age,
      address: req.body.address,
      phone: req.body.phone,
      email: req.body.email,
    },
    cartList: [],
    username: req.body.username,
    password: req.body.password,
  });

  user
    .save()
    .then((result) => {
      res.status(200).json({
        data: result,
      });
    })
    .catch((err) => console.log("err: ", err));
});

router.patch("/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId);

    const info = {
      name: req.body.name || user.name,
      age: req.body.age || user.age,
      address: req.body.address || user.address,
      phone: req.body.phone || user.phone,
      email: req.body.email || user.email,
    };

    const data = await User.updateOne(
      { _id: userId },

      {
        $set: {
          info: info,
        },
      }
    );

    if (data) {
      res.status(200).json({
        message: "Update success",
        data: data,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: {
        message: error.message,
      },
    });
  }
});

router.delete("/:userId", (req, res, next) => {
  const id = req.params.userId;

  User.remove({ _id: id })
    .then((result) =>
      res.status(200).json({
        message: "Deleted success",
        data: result,
      })
    )
    .catch((err) => {
      console.log("error: ", err);
      res.status(500).json({
        error: {
          message: err.message,
        },
      });
    });
});

module.exports = router;
