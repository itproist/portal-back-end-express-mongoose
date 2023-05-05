import UserModel from "../models/User.js";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import Role from "../models/Role.js";
import Telephone from "../models/Telephone.js";
import Position from "../models/Position.js";
import Passport from "../models/Passport.js";
import Person from "../models/Person.js";

export const register = async (req, res) => {
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const userRole = await Role.findOne();
    const userPosition = await Position.findById("64552cbc1ef0d0d114a944e0");

    const doc = new UserModel({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      surname: req.body.surname,
      email: req.body.email,
      passwordHash: hash,
      roles: [userRole.role],
      position: [userPosition.position],

      avatarUrl: req.body.avatarUrl,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret",
      { expiresIn: "30d" }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось зарегистироваться",
    });
  }
};

export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        message: "Пользователь не найден",
      });
    }

    const isValidPass = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );

    if (!isValidPass) {
      return res.status(400).json({
        message: "Неверный логин или пароль",
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret",
      { expiresIn: "30d" }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось авторизоваться",
    });
  }
};

export const me = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(403).json({
        message: "Пользователь не найден",
      });
    }

    const { passwordHash, ...userData } = user._doc;

    res.json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Нет доступа",
    });
  }
};

export const updateMe = async (req, res) => {
  try {
    const userId = req.params.id;

    UserModel.findByIdAndUpdate({
      _id: userId,
    })
      .then((doc) => {
        if (!doc) {
          return res.status(404).json({
            message: "Пользователь не найден!",
          });
        }
        res.json(doc);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({
          message: "Не удалось вернуть пользователя",
        });
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Ошибка при получение данных о пользователи",
    });
  }
};

export const removeUser = async (req, res) => {
  try {
    const userId = req.params.id;

    UserModel.findOneAndDelete({
      _id: userId,
    })
      .then((doc) => {
        if (!doc) {
          return res.status(404).json({
            message: "Пользователь не найден",
          });
        }
        res.json({
          success: true,
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({
          message: "Не удалось удалить пользователя",
        });
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить пользователя",
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    await UserModel.updateOne(
      {
        _id: userId,
      },
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        surname: req.body.surname,
        email: req.body.email,
        passwordHash: hash,
        avatarUrl: req.body.avatarUrl,
      }
    );

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось обновить пользователя",
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить пользователей",
    });
  }
};
