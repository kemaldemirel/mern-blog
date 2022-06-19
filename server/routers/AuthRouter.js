import { Router } from "express";
import AuthController from "../controllers/AuthController.js";
import { registarionValidator, loginValidator } from "../validations/auth.js";
import checkAuth from "../middlewares/CheckAuth.js";

const AuthRouter = new Router();

AuthRouter.post("/reg", registarionValidator, AuthController.reg);
AuthRouter.post("/login", loginValidator, AuthController.login);
AuthRouter.get("/check", checkAuth, AuthController.check);

export default AuthRouter;
