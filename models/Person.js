import mongoose from "mongoose";

const PersonSchema = new mongoose.Schema({
  placeOfWork: {
    type: String,
  },
  personnelNumber: {
    type: Number,
  },
});

export default mongoose.model("Person", PersonSchema);
