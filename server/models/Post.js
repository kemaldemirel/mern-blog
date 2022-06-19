import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    authorID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    tags: {
      type: Array,
      default: [],
    },
    viewsCount: {
      type: Number,
      default: 0,
    },
    postIMG: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Post", PostSchema);
