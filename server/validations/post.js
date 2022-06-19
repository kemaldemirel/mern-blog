import { body } from "express-validator";

export const registarionValidator = [
  body("title", "Введите заголовок статьи").isLength({ min: 5 }),
  body("description", "Введите описание статьи").isLength({
    min: 10,
  }),
  body("tags", "Неверный формат тегов (передайте строчкой через запятую)")
    .optional()
    .isString(),
  body("postIMG", "Не корректный URL адрес").optional().isString(),
];
