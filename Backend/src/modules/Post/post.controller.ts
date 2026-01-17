import { Request, Response } from "express";
import { postService } from "./post.services";
import { PostStatus } from "../../../generated/prisma/enums";
import paginationSortingHelper from "../../helpers/paginationAndSortinghelper";

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
    const status = req.query.status as PostStatus | undefined;
    const authorId = req.query.authorId as string;

    const { page, limit, skip, sortBy, sortOrder } = paginationSortingHelper(
      req.query
    );

    const result = await postService.getAllPosts({
      search: searchString,
      tags,
      isFeatured,
      status,
      authorId,
      page,
      limit,
      skip,
      sortBy,
      sortOrder,
    });
    res.status(200).json({
      success: true,
      message: "Posts Retrived Successfully",
      result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Posts Retrieval failed",
      details: error,
    });
  }
};
const getPostById = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;

    if (!postId) {
      return res.status(400).json({
        message: "Post Id Not Found",
      });
    }
    const result = await postService.getPostById(postId);
    res.status(201).json({
      result,
    });
  } catch (error: any) {
    res.status(400).json({
      message: "Post not found",
      details: error,
    });
  }
};

const getMyPosts = async (req: Request, res: Response) => {
  try {
    const userId = req?.user?.id;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User Id Not Found",
      });
    }

    const result = await postService.getMyPosts(userId);
    res.status(201).json({
      success: true,
      result,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Post retrieval failed";
    res.status(400).json({
      success: false,
      error: errorMessage,
      details: error,
    });
  }
};
const updatePosts = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const { postId } = req.params;
    const userId = req?.user?.id;
    const isAdmin = user?.role === "ADMIN";
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User Id Not Found",
      });
    }

    const result = await postService.updatePosts(
      postId as string,
      req.body,
      userId,
      isAdmin
    );
    res.status(201).json({
      success: true,
      result,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Post Update failed";
    res.status(400).json({
      success: false,
      error: errorMessage,
      details: error,
    });
  }
};
const deletePostById = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const { postId } = req.params;
    const userId = req?.user?.id;
    const isAdmin = user?.role === "ADMIN";
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User Id Not Found",
      });
    }

    const result = await postService.deletePostById(
      postId as string,
      userId,
      isAdmin
    );
    res.status(201).json({
      success: true,
      message: "Post Deleted Successfully",
      result,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Post deletation failed";
    res.status(400).json({
      success: false,
      error: errorMessage,
      details: error,
    });
  }
};

export const postController = {
  createPost,
  getAllPosts,
  getPostById,
  getMyPosts,
  updatePosts,
  deletePostById,
};
