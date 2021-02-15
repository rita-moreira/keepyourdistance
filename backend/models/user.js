import mongoose from "mongoose";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
      max: 32,
      unique: true,
      index: true,
      lowercase: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
    },
    hashed_password: {
      type: String,
      required: true,
    },
    //salt --> how strong is the password
    salt: String,
    description: {
      type: String,
      default: "description",
    },
    country: {
      type: String,
      default: " ",
    },
    role: {
      type: Number,
      default: 0,
    },
    photo: {
      type: String,
      default: "",
    },
    progress: {
      type: Number,
      default: 0,
    },
  },
  { timestamp: true }
);

userSchema
  .virtual("password")
  .set(function (password) {
    //create a temporary variable called _password
    this._password = password;
    //generate salt
    this.salt = this.makeSalt();
    //encryptPassword
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

userSchema.methods = {
  //method to authenticate user
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },
  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },

  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random()) + "";
  },
};

export default mongoose.model("User", userSchema);
