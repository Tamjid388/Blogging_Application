import { NextFunction, Request,Response, Router } from "express";
import { postController } from "./post.controller";
import auth from "../../Middleware/auth";


const router=Router()



router.get("/",postController.getAllPosts)
router.get("/my-posts",auth("USER"),postController.getMyPosts);
router.get("/:postId",postController.getPostById)
router.post("/",auth('ADMIN','USER'),postController.createPost)
export const postRouter=router;
