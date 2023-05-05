import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    avatarUrl: String,
    roles: [
      {
        type: String,
        ref: "Role",
      },
    ],
    position: [
      {
        type: String,
        ref: "Position",
      },
    ],
    telephone: [
      {
        type: String,
        ref: "Telephone",
      },
    ],
    passport: [
      {
        type: String,
        ref: "Passport",
      },
    ],
    person: [
      {
        type: String,
        ref: "Person",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", UserSchema);
