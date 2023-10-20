import SignIn from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const Auth = async (req, res, next) => {
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

    req.user = user;
    next();
  } catch (error) {
    return res.status(400).json(error);
  }
};
