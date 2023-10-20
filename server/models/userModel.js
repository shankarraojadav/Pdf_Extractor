import mongoose from "mongoose";
import bcrypt from "bcrypt";


const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },

  displayName: {
    type: String,
  },

  photoURL: {
    type: String,
  },

  uid: {
    type: String,
  },

  jwtToken: {
    type: String
  }
});

userSchema.pre("save", async function (next) {
  if (this.isModified("uid")) {
    const hashedUid = await bcrypt.hash(this.uid, 10);
    this.uid = hashedUid;
  }
  next();
});

const SignIn = mongoose.model("register", userSchema);

export default SignIn;
