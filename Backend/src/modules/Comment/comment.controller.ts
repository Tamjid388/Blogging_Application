import { Request, Response } from "express";
import { commentServices } from "./conment.services";
import { string, success } from "better-auth/*";

const createComment = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    req.body.authorId = user?.id;
    const body = req.body;
    console.log(body);
    const result = await commentServices.createComment(body);
    res.status(201).json({
      result,
    });
  } catch (error: any) {
    res.status(400).json({
      message: "Comment creation failed",
      details: error,
    });
  }
};
const getCommentById = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;
    if (!commentId) {
      return res.status(401).json({
        success: false,
        message: "Comment Id Not Found",
      });
    }
    const result = await commentServices.getCommentById(commentId);
    res.status(201).json({
      result,
    });
  } catch (error: any) {
    res.status(400).json({
      message: "Comment retreival failed",
      details: error,
    });
  }
};
//comments by author id
const getCommentsByAuthor = async (req: Request, res: Response) => {
  try {
    const { authorId } = req.params;
    if (!authorId) {
      return res.status(401).json({
        success: false,
        message: "Author Id Not Found",
      });
    }
    const result = await commentServices.getCommentsByAuthor(authorId);
    res.status(201).json({
      result,
    });
  } catch (error: any) {
    res.status(400).json({
      message: "Comments retreival failed",
      details: error,
    });
  }
};

const deleteComment = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;
    const userId = req?.user?.id;
    if (!commentId) {
      return res.status(400).json({
        success: false,
        message: "comment Id Not Found",
      });
    }
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User Id Not Found",
      });
    }

    const result = await commentServices.deleteComment({ commentId, userId });
    res.status(201).json({
      success: true,
      result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Comment delete failed",
      details: error?.message || error,
    });
  }
};
const updateComment = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;
    const userId = req?.user?.id;
    if (!commentId) {
      return res.status(400).json({
        success: false,
        message: "comment Id Not Found",
      });
    }
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User Id Not Found",
      });
    }

    const result = await commentServices.updateComment(
      commentId,
      req.body,
      userId
    );
    res.status(201).json({
      success: true,
      result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Comment update failed",
      details: error?.message || error,
    });
  }
};

//--> moderate comments
const moderateComments = async (req: Request, res: Response) => {
  try {
    const body=req.body
    const { commentId } = req.params;
    const userId = req?.user?.id;
    if (!commentId) {
      return res.status(400).json({
        success: false,
        message: "comment Id Not Found",
      });
    }
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User Id Not Found",
      });
    }

    const result = await commentServices.moderateComments(
  commentId,body);
    res.status(201).json({
      success: true,
      result,
    });
  } catch (error) {
    const errorMessage=(error instanceof Error)?error.message:"Comment Update failed"
    res.status(400).json({
      success: false,
      error:errorMessage,
      details:error
      
    });
  }
};


export const commentController = {
  createComment,
  getCommentById,
  getCommentsByAuthor,
  deleteComment,
  updateComment,
  moderateComments,
};
