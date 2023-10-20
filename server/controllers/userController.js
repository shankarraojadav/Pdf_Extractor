import SignIn from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const userController = async (req, res) => {
  const { uid, displayName, email, photoURL } = req.body;

  const oldUser = await SignIn.findOne({ email });

  if (oldUser) {
    return res.status(200).json(oldUser);
  }

  try {
    const newUser = new SignIn({ uid, displayName, email, photoURL });
    await newUser.save();

    const { _id } = newUser;

    const token = jwt.sign({ _id }, process.env.Secret_Key);
    newUser.jwtToken = token;

    await newUser.save();

    res.status(200).json(newUser);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const verifyToken = async (req, res) => {
  try {
    const token = req.headers?.authorization;

    const trimmedToken = token?.trim();

    if (!token) return res.status(400).json("Invalid token");
    const jwtToken = trimmedToken.split("Bearer")[1]?.trim();

    if (!jwtToken) return res.status(400).json("Token not found!");
    const decode = jwt.verify(jwtToken, process.env.Secret_Key);

    const { _id } = decode;
    
    const user = await SignIn.findById({ _id });

    if (!user) return res.status(400).json("Token related to user not found");

    const {email, displayName, photoURL} = user;
   
    return res.status(200).json({ email, displayName, photoURL });

  } catch (error) {
    console.log(error)
  }
};


