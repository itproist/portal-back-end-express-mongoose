import mongoose from "mongoose";

const PositionSchema = new mongoose.Schema({
  position: {
    type: String,
  },
});

export default mongoose.model("Position", PositionSchema);
