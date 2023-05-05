import { body } from "express-validator";

// Валидация логига
export const loginValidation = [
  body("email", "Неверный формат почты").isEmail(),
  body("password", "Пароль должен быть минимум 5 символов").isLength({
    min: 5,
  }),
];

// Валидация постов
export const postCreateValidation = [
  body("title", "Введите текст статьи").isLength({ min: 3 }).isString(),
  body("text", "Введите текст статьи").isLength({ min: 3 }).isString(),
  body("tags", "Неверный формат тэгов (указите массив)").optional().isString(),
  body("imageUrl", "Неверная ссылка на изображения").optional().isString(),
];

// Валидация регистрации
export const registerValidation = [
  body("firstName", "Укажите имя").isLength({ min: 3 }),
  body("email", "Неверный формат почты").isEmail(),
  body("password", "Пароль должен быть минимум 5 символов").isLength({
    min: 5,
  }),
  body("avatarUrl", "Неверная ссылка на аватарку").optional().isURL(),
];
