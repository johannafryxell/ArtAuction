//////////////
// IMPORTS //
////////////
import crypto from "crypto";
import bcrypt from "bcrypt";
//////////////
// HASHING //
////////////
export const hashPassword = (password:string) => {
  const hash:string = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  return hash;
};
export const comparePassword = (password:string, hash:string) => {
  const correct:boolean = bcrypt.compareSync(password, hash);
  return correct;
};
export const generateAuthToken = () => {
  return crypto.randomBytes(30).toString("hex");
};

///////////////////
// GENERATE KEY //
/////////////////
const key = crypto.randomBytes(32).toString("hex");