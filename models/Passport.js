import mongoose from "mongoose";

const PassportSchema = new mongoose.Schema(
  {
    series: {
      type: String,
    },
    number: {
      type: String,
    },
    addressOfResidence: {
      type: String,
    },
    addressRegistration: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Passport", PassportSchema);
