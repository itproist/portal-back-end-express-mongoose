import mongoose from "mongoose";

const TelephoneSchema = new mongoose.Schema({
  telephone: {
    type: String,
    unique: true,
  },
});

export default mongoose.model("Telephone", TelephoneSchema);
