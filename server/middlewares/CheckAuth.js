import jwt from "jsonwebtoken";
import { responseUser } from "../utils/responseUser.js";

export default (req, res, next) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");

  if (!token) {
    return res.status(403).json(responseUser(false, "Нет доступа"));
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.userID = decoded._id;
    next();
  } catch (e) {
    console.log(e);
    return res.status(403).json(responseUser(false, "Нет доступа"));
  }
};
