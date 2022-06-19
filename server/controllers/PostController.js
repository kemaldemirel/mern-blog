import mongoose from "mongoose";
import PostModel from "../models/Post.js";
import { responseUser } from "../utils/responseUser.js";

class PostController {
  async create(req, res) {
    try {
      const { title, description, postIMG, tags } = req.body;

      const tagsArray = tags
        .split(",")
        .filter((tag) => tag.length)
        .map((tag) => tag.trim());

      const doc = new PostModel({
        title,
        description,
        postIMG,
        tags: tagsArray,
        authorID: req.userID,
      });

      const post = await doc.save();

      return res.json(post);
    } catch (e) {
      console.log(e);
      return res.json(responseUser(false, "Не удалось создать статью"));
    }
  }

  async all(req, res) {
    try {
      const posts = await PostModel.find();
      const count = await PostModel.count();

      return res.json({
        count,
        posts,
      });
    } catch (e) {
      console.log(e);
    }
  }
}

export default new PostController();
