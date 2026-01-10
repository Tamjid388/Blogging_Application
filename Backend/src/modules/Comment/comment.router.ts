import { NextFunction, Request, Response, Router } from "express";

import auth from "../../Middleware/auth";
import { commentController } from "./comment.controller";

const router = Router();

router.get("/:commentId", commentController.getCommentById);


router.get("/author/:authorId", commentController.getCommentsByAuthor);

router.post("/", auth("ADMIN", "USER"), commentController.createComment);
router.delete(
  "/delete/:commentId",
  auth("ADMIN", "USER"),
  commentController.deleteComment
);
router.patch(
  "/update/:commentId",
  auth("ADMIN", "USER"),
  commentController.updateComment
);
router.patch("/moderate/:commentId",auth('ADMIN',"USER"),commentController.moderateComments)
export const commentRouter: Router = router;
