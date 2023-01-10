import { IUser, Users } from "../models/UserModel";
import { Request, Response } from "express";
const jwt = require("jsonwebtoken");


//////////////////////////
// ACCOUNT CONTROLLERS //
////////////////////////
export const getAccount = async (req: Request, res: Response) => {
  let {email} = req.body;
  console.log(email);

  if (email) {
    Users.findOne({ email }, (err: any, user: IUser) => {
      if (user) {
        res.send(user);
      } else {
        res.send("error");
      }
    });
  } else {
    res.send("error");
  }
};
