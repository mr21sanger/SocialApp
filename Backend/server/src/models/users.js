const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      maxlength: 20,
      minlength: 2,
      trim: true,
      required: true,
    },
    lastName: {
      type: String,
      maxlength: 20,
      minlength: 2,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is not valid.... Sign up database error");
        }
      },
      required: true,
      unique: true,
    },
    bio: {
      type: String,
      maxlength: 75,
    },
    password: {
      type: String,
      minlength: 6,
      required: true,
    },
    followers: {
      type: Array,
      default: [],
    },
    following: {
      type: Array,
      default: [],
    },
    pfp: {
      type: String,
      default:"https://t4.ftcdn.net/jpg/00/84/67/19/360_F_84671939_jxymoYZO8Oeacc3JRBDE8bSXBWj0ZfA9.jpg"
    },
    date: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcryptjs.hash(this.password, 16);
  }
  next();
});

const UserModel = mongoose.model("user", userSchema);
module.exports = UserModel;
