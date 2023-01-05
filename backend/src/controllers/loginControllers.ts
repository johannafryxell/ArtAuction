import axios from "axios";
import { Request, Response } from "express";
import { fetchData } from "../../services/fetchData";
import { comparePassword, hashPassword } from "../../services/utils";
const jwt = require("jsonwebtoken");
import { Users } from "../models/UserModel";
import { IUser } from "../models/UserModel";

////////////////////////
// LOGIN CONTROLLERS //
//////////////////////

export const postLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  Users.findOne({ email }, (err: any, user: IUser) => {
    if (user && comparePassword(password, user.password)) {
      const userData = { email: user.email, id: user._id };
      const accessToken = jwt.sign(userData, process.env.JWT_SECRET);

      res.send({signIn: true, token: accessToken});
    }else{
      res.send({signIn: false});
    }
  });
};

export const postSignup = async (req: Request, res: Response) => {
  const { email, firstName, lastName, password, confirmPassword } = req.body;

  Users.findOne({ email }, async (err: any, user: IUser) => {
    if (user) {
      console.log("The mail exists");
    } else if (password !== confirmPassword) {
      console.log("The password doesnt match");
    } else if (!password || !confirmPassword) {
      console.log("You need to have a password");
    } else {
      const newUser = new Users({
        email,
        firstName,
        lastName,
        password: hashPassword(password),
      });
      newUser.validateSync();
      await newUser.save();
    }
  });
};
