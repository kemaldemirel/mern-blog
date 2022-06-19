import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import UserModal from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";
import { responseUser } from "../utils/responseUser.js";

class AuthController {
  async reg(req, res) {
    try {
      const { email, password, fullName, avatarURL } = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
      }

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      const doc = new UserModal({
        email,
        passwordHash: hash,
        fullName,
        avatarURL,
      });

      const user = await doc.save();
      const { passwordHash, _id, ...userData } = user._doc;

      const token = generateToken({ _id });

      res.json(responseUser(true, token, userData));
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .json(responseUser(true, "Ошибка регистрации. Попробуйте позже"));
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
      }

      const user = await UserModal.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: "Пользователь не найден" });
      }

      const { passwordHash, _id, ...userData } = user._doc;
      const validPassord = await bcrypt.compare(password, passwordHash);

      if (!validPassord) {
        return res.status(404).json({ message: "Неверный логин или пароль" });
      }

      const token = generateToken({ _id });

      return res.json(responseUser(true, token, userData));
    } catch (e) {
      console.log(e);
      return res.json(
        responseUser(false, "Ошибка авторизации. Попробуйте позже")
      );
    }
  }

  async check(req, res) {
    try {
      const { userID } = req;
      const user = await UserModal.findOne({ userID });
      const { passwordHash, _id, ...userData } = user._doc;

      if (!user) {
        return res
          .status(404)
          .json(responseUser(false, "Пользователь не найден"));
      }

      const token = generateToken({ _id });

      return res.json(responseUser(true, "", token, userData));
    } catch (e) {
      console.log(e);
      return res.status(500).json(responseUser(false, "Ошибка системы"));
    }
  }
}

export default new AuthController();
