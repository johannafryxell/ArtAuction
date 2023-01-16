import axios from "axios";
import { Request, Response } from "express";
import { fetchData } from "../../services/fetchData";
import { comparePassword, hashPassword } from "../../services/utils";
const jwt = require("jsonwebtoken");
import { Users } from "../models/UserModel";
import { IUser } from "../models/UserModel";
const cookieParser = require("cookie-parser");

////////////////////////
// LOGIN CONTROLLERS //
//////////////////////

export const postLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  Users.findOne({ email }, (err: any, user: IUser) => {
    if (user && comparePassword(password, user.password)) {
      const userData = { email: user.email, id: user._id };
      const accessToken = jwt.sign(userData, process.env.JWT_SECRET);

      res.send({ signIn: true, token: accessToken });
    } else {
      res.send({ signIn: false });
    }
  });
};

export const postSignup = async (req: Request, res: Response) => {
  const { email, firstName, lastName, password, confirmPassword } = req.body;

  if (
    (firstName.trim() ||
      lastName.trim() ||
      password.trim() ||
      confirmPassword.trim() ||
      email.trim()) == "" ||
    null
  ) {
    res.send("empty");
    return
  }

  Users.findOne({ email }, async (err: any, user: IUser) => {
    if (user) {
      res.send("exist");
    } else if (password !== confirmPassword) {
      res.send("noMatch");
    } else {
      const newUser:any = new Users({
        email,
        firstName,
        lastName,
        password: hashPassword(password),
      });
      newUser.validateSync();
      let created = await newUser.save();

      const userData = { email: created.email, id: created._id };
      const accessToken = jwt.sign(userData, process.env.JWT_SECRET);

      res.send({ signIn: true, token: accessToken });
    }
  });
};
