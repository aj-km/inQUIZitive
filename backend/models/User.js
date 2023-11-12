const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const QuizResponseSchema = new mongoose.Schema({
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref:'Quiz'
  },
  responses: [
    {
      questionId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      chosenOption: {
        type: String,
        required: true,
      },
    },
  ],
  score: {
    type: Number,
    required: true,
  },
});
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter a name"],
  },
  avatar: {
    public_id: String,
    url: String,
  },
  email: {
    type: String,
    required: [true, "Please enter a email"],
    unique: [true, "Email already exists"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "Password must be at least 6 characters"],
    select: false,
    //to access user data without password
  },
  isAdmin: {
    type: Boolean,
    default: false,
    // default: true,
  },
  quizzes: [QuizResponseSchema],
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  //hashed passwd ko dobara hash kr dega
  next();
});

userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
  //this.password->hashed password
};
userSchema.methods.generateToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
};
userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};
module.exports = mongoose.model("User", userSchema);
