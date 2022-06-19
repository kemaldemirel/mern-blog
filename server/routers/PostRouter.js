import { Router } from "express";
import PostController from "../controllers/PostController.js";
import CheckAuth from "../middlewares/CheckAuth.js";

const PostRouter = new Router();

PostRouter.post("/create", CheckAuth, PostController.create);
PostRouter.get("/all", CheckAuth, PostController.all);

export default PostRouter;
