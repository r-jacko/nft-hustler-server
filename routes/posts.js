import express from 'express';
import {getPosts,getPost,createPost,updatePost, deletePost,getPostsBySearch} from '../controllers/posts.js'

const router = express.Router();

router.get("/", getPosts);
router.get('/search', getPostsBySearch)
router.get("/:id", getPost);
router.post("/submit", createPost);
router.patch("/submit/:id", updatePost);
router.delete("/:id", deletePost);

export default router;