import mongoose from "mongoose";

const StarbucksSchema = new mongoose.Schema({
  name: String,
  img: Buffer,
});

export const Starbucks = mongoose.model("Starbucks", StarbucksSchema);
