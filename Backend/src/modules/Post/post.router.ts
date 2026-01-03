import { NextFunction, Request,Response, Router } from "express";
import { postController } from "./post.controller";
import { auth as betterAuth} from "../../lib/auth";
import auth from "../../Middleware/auth";


const router=Router()


router.post("/",auth('ADMIN','USER'),postController.createPost)
router.get("/",postController.getAllPosts)
export const postRouter=router;
