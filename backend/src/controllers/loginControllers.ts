import axios from "axios";
import { Request, Response } from "express";
import { fetchData } from "../../services/fetchData";
import { comparePassword, hashPassword } from "../../services/utils";
import { Users } from "../models/UserModel";
import { IUser } from "../models/UserModel";

////////////////////////
// LOGIN CONTROLLERS //
//////////////////////

export const postLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  Users.findOne({ email }, (err:any, user:IUser) => {
    if (user && comparePassword(password, user.password)){
        
    }

  });
};

export const postSignup = async (req: Request, res: Response) => {
    const { email,firstName, lastName, password, confirmPassword } = req.body;

    Users.findOne({ email }, async (err:any, user:IUser) => {
      if (user) {
        res.render("login", { signIn: false, userExists: true });
      } else if (password !== confirmPassword) {
        res.render("login", { signIn: false, wrongPassword: true });
      } else if (!password || !confirmPassword) {
        res.render("login", { signIn: false, wrongPassword: true });
      } else {
        const newUser = new Users({
          email,
          firstName,
          lastName,
          password: hashPassword(password),
        });
        newUser.validateSync();
        await newUser.save();
        res.redirect("/login");
      }
    });
};
