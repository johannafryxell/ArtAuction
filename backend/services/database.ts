import mongoose from "mongoose";
require("dotenv").config();

mongoose
  .connect("mongodb://localhost:27017/ArtAuction", {})
  .then(() => {
    console.log("Server running");
  })
  .catch((err) => {
    console.log(err);
  });