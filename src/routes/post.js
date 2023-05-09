import express from "express";
import * as postController from "./../controllers/post"
import verifyToken from "../middleware/verifyToken";

const router = express.Router();

router.get("/get-all", postController.getPosts);
router.get("/limit", postController.getPostsLimit);
router.get("/:id", postController.getDetailPost);
router.get("/new-post", postController.getNewPosts);
router.use(verifyToken)
router.post("/limit-admin", postController.getPostsLimitByAdmin);
router.post("/create-post", postController.createPost);
router.put("/update-post", postController.updatePost);
router.delete("/:id/delete-post", postController.deletePost);

export default router;
