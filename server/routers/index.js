import { Router } from "express";
import AuthRouter from "./AuthRouter.js";
import PostRouter from "./PostRouter.js";

const router = new Router();

router.use("/auth", AuthRouter);
router.use("/post", PostRouter);

export default router;
