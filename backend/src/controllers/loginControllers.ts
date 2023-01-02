import axios from "axios";
import { Request, Response } from "express";
import { fetchData } from "../../services/fetchData";
import { Users } from "../models/UserModel";

////////////////////////
// LOGIN CONTROLLERS //
//////////////////////

export const postLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  Users.findOne({ email }, (err, user) => {
    if (user && comparePassword(password, user.password)){
        
    }

  });
};
