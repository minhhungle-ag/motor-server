const express = require("express");
const uuid = require("uuid").v4;

const { Types } = require("mongoose");
const User = require("../models/user");

const router = express.Router();

router.get("/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId);
    if (!user || user.cartList) {
      res.status(200).json({
        data: [],
      });
    }

    const cartList = [...user.cartList];

    res.status(200).json({
      data: cartList,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: error.message,
    });
  }
});

router.get("/:userId/:cardId", async (req, res) => {
  const cartId = req.params.cartId;
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId);

    const cartList = [...user.cartList];
    const cart = cartList.find((item) => item._id === cartId);

    res.status(200).json({
      data: cart,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: error.message,
    });
  }
});

router.patch("/:userId", async (req, res) => {
  const userId = req.params.userId;

  const cart = {
    _id: new Types.ObjectId(),
    color: req.body.color,
    chassis: req.body.chassis,
    brake_pads: req.body.brake_pads,
    amount: req.body.amount,
  };

  try {
    const user = await User.findById(userId);

    const newCartList = [cart, ...user.cartList];

    console.log(user.cartList);

    const data = await User.updateOne(
      { _id: userId },

      {
        $set: {
          cartList: newCartList,
        },
      }
    );

    res.status(200).json({
      data: data,
      message: "success",
    });
  } catch (error) {
    console.log(error);
    res.status(200).json({
      message: error.message,
    });
  }
});

router.post("/", (req, res) => {
  const id = req.body.userId;

  const cart = {
    id: uuid(),
    color: req.body.color,
    chassis: req.body.chassis,
    brake_pads: req.body.brake_pads,
    amount: req.body.amount,
  };

  res.status(200).json({
    data: cart,
  });
});

module.exports = router;
