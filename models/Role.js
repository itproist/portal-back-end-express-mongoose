import mongoose from "mongoose";

const RoleSchema = new mongoose.Schema({
  role: {
    type: String,
    default: "User",
  },
});

export default mongoose.model("Role", RoleSchema);
