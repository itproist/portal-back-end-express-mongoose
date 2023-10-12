import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import { UserController, PostController } from "./controllers/index.js";
import { checkAuth, handleValidationErrors } from "./utils/index.js";
import { loginValidation, postCreateValidation } from "./validations/index.js";
import cors from "cors";

mongoose
  .connect(
    "mongodb+srv://admin:admin@mern.q0o0jzj.mongodb.net/portal?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log(`Database work`);
  })
  .catch((err) => {
    console.log(`Database error ${err}`);
  });

const PORT = process.env.PORT || 5000;

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

// Регистрация, авторизация и  получение информации об себе handleValidationErrors
app.post("/auth/register", handleValidationErrors, UserController.register);
app.post(
  "/auth/login",
  loginValidation,
  handleValidationErrors,
  UserController.login
);
app.get("/users", UserController.getAll);

// checkAuth
app.get("/auth/me", checkAuth, UserController.me);
// +
app.get("/auth/me/:id", UserController.updateMe);
app.delete("/auth/me/:id", UserController.removeUser);
// +
app.patch("/auth/me/:id", UserController.updateUser);

// Создание, удаление, обновление, получение всех статей, получение одной статьи, получение тэгов
app.get("/posts", PostController.getAll);
app.get("/posts/:id", PostController.getOne);
app.post(
  "/posts",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.create
);
app.post("/tags", PostController.getLastTags);
app.delete("/posts/:id", checkAuth, PostController.remove);
app.patch(
  "/posts/:id",
  checkAuth,
  handleValidationErrors,
  PostController.update
);

// Изображение
app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
