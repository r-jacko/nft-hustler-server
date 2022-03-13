import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
  const {page} = req.query;
  try {
    const LIMIT = 8;
    const startIndex = (Number(page)-1)*LIMIT;
    const total = await PostMessage.countDocuments({});
    const posts = await PostMessage.find().sort({_id:-1}).limit(LIMIT).skip(startIndex);
    console.log(posts);
    res.status(200).json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total/LIMIT) });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await PostMessage.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  console.log(req.body);
  const post = req.body;
  const newPost = new PostMessage({
    ...post,
    // creator: req.userId,
    createdAt: new Date().toISOString(),
  });
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that ID");
  const updatedPost = await PostMessage.findByIdAndUpdate(
    _id,
    { ...post, _id },
    { new: true }
  );
  res.status(200).json(updatePost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id");
  await PostMessage.findByIdAndDelete(id);
  res.status(200).json({ Message: "Post deleted successfully" });
};
