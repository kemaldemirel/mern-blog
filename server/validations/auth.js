import { body } from "express-validator";

export const registarionValidator = [
  body("email", "Не корректный email").isEmail(),
  body("password", "Пароль должен быть не менее 5 символов").isLength({
    min: 5,
  }),
  body("fullName", "Имя должнл быть не менее 3 символов").isLength({ min: 3 }),
  body("avatarURL", "Не корректный URL адресс").optional().isURL(),
];

export const loginValidator = [
  body("email", "Не корректный email").isEmail(),
  body("password", "Пародль должен быть не менее 5 символов").isLength({
    min: 5,
  }),
];
