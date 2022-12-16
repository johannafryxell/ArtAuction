import { Schema, model } from "mongoose";

interface IUser {
  mail: String;
  password: String;
  firstName: String;
  lastName: String;
}

export const UserSchema = new Schema({
  mail: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
});

export const Users = model<IUser>("Users", UserSchema);