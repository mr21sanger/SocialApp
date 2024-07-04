const express = require("express");
const Posts = require("../models/post");
const UserModel = require("../models/users");
const router = express.Router();
const upload = require("../middleware/multer");
const cloudinary = require("../Config/cloudinary");
const { setNotificationStatus } = require("../Routers/socket");
const NotificationModel = require("../models/notificationModel");

router.route("/create-post").post(async (req, res) => {
  try {
    const { description, id } = req.body;
    console.log(description, id);
    if (!description || !id) {
      return res.status(401).json({
        status: false,
        message: "Please provide valid info.",
      });
    }
    const data = await Posts({
      description,
      userId: id,
    });
    await data.save();
    return res.status(201).json({ status: true, data });
  } catch (error) {
    return res.status(500).json({ status: false, error });
  }
});

// All Posts

router.route("/getAllPost/:id/:filter").get(async (req, res) => {
  try {
    const { id, filter } = req.params;
    if (filter == "all") {
      const data = await Posts.find();
      return res.status(200).json({ status: true, data });
    } else {
      const user = await UserModel.find({ _id: id });
      const followings = user?.[0]?.following.map((user) => user.toString());
      const followers = user?.[0]?.followers.map((user) => user.toString());

      const totalUser = Array.from(new Set([...followings, ...followers]));
      console.log(totalUser, 222);

      const data = await Posts.find({ userId: { $in: totalUser } });
      console.log(data);
      return res.status(201).json({ status: true, data });
    }
  } catch (error) {
    return res.status(500).json({ status: false, error });
  }
});

router
  .route("/createPost/:id")
  .post(upload.array("post", 5), async (req, res) => {
    try {
      const { id } = req.params;
      const { Caption } = req.body;

      const upload = req.files.map(async (currElem) => {
        const result = await cloudinary(currElem.path);
        return result.url;
      });
      const fileUrls = await Promise.all(upload);
      const posts = await Posts.create({
        userId: id,
        description: Caption,
        post: fileUrls,
      });
      await posts.save();
      return res.status(201).json({ status: true, posts });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: false, error });
    }
  });

router.route("/findThisPost/:id").get(async (req, res) => {
  try {
    const { id } = req.params;
    const singlePost = await Posts.findById(id);
    return res.status(201).json({ status: true, data: singlePost });
  } catch (error) {
    console.error(error);
  }
});

// LIKE AND DISLIKE THE POST
router.route("/like/:id").put(async (req, res) => {
  try {
    const id = req.body.userId; //USERID
    const postId = req.params.id; // POSTID
    const post = await Posts.findOne({ _id: postId });
    if (post.like.includes(id)) {
      const data = await Posts.findByIdAndUpdate(
        { _id: postId },
        { $pull: { like: id } },
        { new: true }
      );

      if (postId !== id) {
        await NotificationModel.findOneAndDelete({ reactedBy: id });
      }
      return res
        .status(201)
        .json({ status: true, message: "Unliked user", liked: false });
    } else {
      const data = await Posts.findByIdAndUpdate(
        { _id: postId },
        { $push: { like: id } },
        { new: true }
      );
      const postUserId = data?.userId.toString();

      if (id !== postUserId) {
        const notification = await NotificationModel.create({
          userId: postUserId,
          reactedBy: id,
          postId,
          message: "Liked your post",
          type: "like",
        });
        await notification.save();
        setNotificationStatus(postUserId);
      }

      return res
        .status(201)
        .json({ status: true, message: "Liked", liked: true });
    }
  } catch (error) {
    return res.status(401).json({ status: false, error });
  }
});

// COMMENT ON THE POST
router.route("/comment/:id").post(async (req, res) => {
  try {
    const postId = req.params.id;
    const { userId, comment } = req.body;
    if (!userId && !comment) {
      return res.status(401).json({ status: false, message: "Bad request" });
    }
    const data = await Posts.findByIdAndUpdate(
      postId,
      {
        $push: { comment: { comment, userId } },
      },
      { new: true }
    );

    const postUserId = data?.userId?.toString();
    if (userId !== postUserId) {
      const notification = await NotificationModel.create({
        postId,
        reactedBy: userId,
        userId: postUserId,
        type: "comment",
        read: false,
        message: "commented on your post",
      });
      await notification.save();
    }
    setNotificationStatus(postUserId);
    return res.status(201).json({ status: true, data });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: false, message: "error in comment posting" });
  }
});

router.route("/findPost/:id").get(async (req, res) => {
  try {
    const { id } = req.params;
    const userPosts = await Posts.find({ userId: id });
    return res.status(201).json({ status: true, userPosts });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: false, error });
  }
});

//GET ALL NOTIFICATIONS
router.route("/notification/:id/:type").get(async (req, res) => {
  try {
    const { id, type } = req.params;
    console.log(type);
    if (type == "all") {
      const allNotifications = await NotificationModel.find({ userId: id });
      return res.status(201).json({ status: true, data: allNotifications });
    } else {
      const filterNotification = await NotificationModel.find({
        userId: id,
        type,
      });

      return res.status(201).json({ status: true, data: filterNotification });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: false, error });
  }
});

// //MARK AS READ
router.route("/markRead/:id").put(async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await NotificationModel.updateMany(
      { userId: id, read: false },
      {
        read: true,
      },
      { new: true }
    );

    return res.status(201).json({ status: true, data: notification });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: false, error });
  }
});

// FILTER NOTIFICATION

module.exports = router;
