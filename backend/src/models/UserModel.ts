import { Schema, model } from "mongoose";

interface IUser {
  mail: String;
  password: String;
  image: String;
  description: String;
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
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  posts: [{ type: Schema.Types.ObjectId, ref: "Posts" }],
});

export const Users = model<IUser>("Users", UserSchema);