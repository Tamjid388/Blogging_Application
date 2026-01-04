import { Request, Response } from "express";
import { postService } from "./post.services";
import { PostStatus } from "../../../generated/prisma/enums";

const createPost = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    console.log(user);
    if (!user) {
      return res.status(400).json({
        message: "Unauthorized",
      });
    }
    const result = await postService.createPost(req.body, user.id as string);
    res.status(201).json({
      result,
    });
  } catch (error: any) {
    res.status(400).json({
      message: "Post creation failed",
      details: error,
    });
  }
};

const getAllPosts = async (req: Request, res: Response) => {
  try {
    const { search } = req.query;
    const searchString = typeof search === "string" ? search : undefined;
    const tags = req.query.tags ? (req.query.tags as string).split(",") : [];

    const isFeatured = req.query.isFeatured
      ? req.query.isFeatured === "true"
        ? true
        : req.query.isFeatured === "false"
        ? false
        : undefined
      : undefined;
    const status=req.query.status as PostStatus | undefined
    const authorId=req.query.authorId as string 
    const result = await postService.getAllPosts({
      search: searchString,
      tags,
      isFeatured,status, authorId
    });
    res.status(201).json({
      success: true,
      message: "Posts Retrived Successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Posts Retrieval failed",
      details: error,
    });
  }
};

export const postController = {
  createPost,
  getAllPosts,
};
