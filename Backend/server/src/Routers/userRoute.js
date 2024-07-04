const express = require("express");
const router = express.Router();
const UserModel = require("../models/users.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const upload = require("../middleware/multer.js");
const uploadCloudinary = require("../Config/cloudinary.js");
const NotificationModel = require("../models/notificationModel.js");
const { setNotificationStatus } = require("./socket.js");

//Get All User

router.route("/users").get(async (req, res) => {
  try {
    const data = await UserModel.find();
    return res.status(200).json({ status: true, data });
  } catch (error) {
    return res.status(500).json({ status: false, error });
  }
});

// SIGN UP ROUTE******************
router.route("/signup").post(async (req, res) => {
  try {
    const { firstName, lastName, email, password, conPassword } = req.body;
    if (!firstName || !lastName || !email || !password || !conPassword) {
      return res
        .status(401)
        .json({ status: false, message: "All feild should be filled " });
    } else if (password != conPassword) {
      return res
        .status(401)
        .json({ status: false, message: "Password not Matched" });
    }
    const userData = await UserModel({
      firstName,
      lastName,
      email,
      password,
    });
    const data = await userData.save();
    return res.status(200).json({ status: true, data });
  } catch (error) {
    console.error("Error occurred during signup:", error);
    return res
      .status(500)
      .json({ status: false, message: "Failed to signup user." });
  }
});

//GET USER **********************
router.route("/get-user/:id").get(async (req, res) => {
  try {
    const id = req.params.id;
    const data = await UserModel.findById(id);
    return res.status(200).json({ status: true, data });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal server error in getting user info",
    });
  }
});

// LOGIN ROUTE************
router.route("/login").post(async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(401)
        .json({ status: false, message: "All feild must be filled" });
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ status: false, message: "Email not found" });
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const obj = {
          status: true,
          message: "Login Successfull",
          data: user,
        };
        return res.status(200).json(obj);
      } else {
        return res.status(401).json({
          status: false,
          message: "Invalid Password!!",
        });
      }
    }
  } catch (error) {
    return res.status(500).json("Login error", error);
  }
});

// UPDATE PROFILE PICS AND BACKGROUND
router.route("/update-pics/:id").put(upload.single("pfp"), async (req, res) => {
  try {
    console.log(req.file);
    const imageUrl = await uploadCloudinary(req.file.path);
    const { id } = req.params;
    console.log(imageUrl);
    const user = await UserModel.findByIdAndUpdate(id, {
      pfp: imageUrl.secure_url,
    });
    await user.save();
    return res.status(200).json({ status: true, user });
  } catch (error) {
    console.log(error);
  }
});

// UPDATE PROFILE Info ********************
router.route("/update-profile/:id").put(async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, bio, email } = req.body;
    const user = await UserModel.findByIdAndUpdate(id, {
      firstName,
      lastName,
      bio,
      email,
    });
    await user.save();
    return res.status(200).json({ status: true });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "Update Error", error });
  }
});

//FOLLOWERS AND FOLLOWINGS ROUTES

router.route("/follow/:id").post(async (req, res) => {
  try {
    const followerId = req.params.id; //DINESH
    const loggedInUser = req.body.userId; // AVNEET
    const user = await UserModel.findById(followerId);
    
    if (user.followers.includes(loggedInUser)) {
      console.log("following");
      await UserModel.findByIdAndUpdate(loggedInUser, {
        $pull: { following: followerId },
      });

      await UserModel.findByIdAndUpdate(followerId, {
        $pull: { followers: loggedInUser },
      });

      //DELETE NOTIFICATION
      await NotificationModel.findOneAndDelete({
        userId: followerId,
        type: "follow",
        reactedBy: loggedInUser,
      });

      return res
        .status(201)
        .json({ status: true, message: "unfollowed successfully" });
    } else {
      // UPDATE FOLLOWING LIST OF LOGGED IN USER
      await UserModel.findByIdAndUpdate(loggedInUser, {
        $push: { following: followerId },
      });

      // UPDATE FOLLOWER LIST OF LOGGED IN USER
      await UserModel.findByIdAndUpdate(followerId, {
        $push: { followers: loggedInUser },
      });

      //CREATE NOTIFICATION
      if (loggedInUser !== followerId) {
        const notification = await NotificationModel.create({
          type: "follow",
          read: false,
          reactedBy: loggedInUser,
          userId: followerId,
          message: "started following you",
        });
        setNotificationStatus(followerId)
        await notification.save();
      }
      return res
        .status(201)
        .json({ status: true, message: "Following successfully" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: false, error });
  }
});

module.exports = router;
