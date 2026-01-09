import { date } from "better-auth/*";
import {
  CommentStatus,
  Post,
  PostStatus,
} from "../../../generated/prisma/client";
import { PostWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";

const createPost = async (
  data: Omit<Post, "id" | "createdAt" | "updatedAt" | "authorId">,
  userid: string
) => {
  const result = await prisma.post.create({
    data: {
      ...data,
      authorId: userid,
    },
  });
  return result;
};

const getAllPosts = async ({
  search,
  tags,
  isFeatured,
  status,
  authorId,
  page,
  limit,
  skip,
  sortBy,
  sortOrder,
}: {
  search: string | undefined;
  tags: string[];
  isFeatured: boolean | undefined;
  status: PostStatus | undefined;
  authorId: string;
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: string;
}) => {
  const andcondition: PostWhereInput[] = [];
  if (search) {
    andcondition.push({
      OR: [
        {
          title: {
            contains: search as string,
            mode: "insensitive",
          },
        },
        {
          content: {
            contains: search as string,
            mode: "insensitive",
          },
        },
        {
          tags: {
            has: search as string,
          },
        },
      ],
    });
  }

  if (tags.length > 0) {
    andcondition.push({
      tags: {
        hasEvery: tags,
      },
    });
  }
  //isFeatured
  if (typeof isFeatured === "boolean") {
    andcondition.push({
      isFeatured,
    });
  }
  //status
  if (status) {
    andcondition.push({
      status,
    });
  }
  if (authorId) {
    andcondition.push({
      authorId,
    });
  }
  const allPosts = await prisma.post.findMany({
    take: limit,
    skip,
    where: {
      AND: andcondition,
    },
    orderBy: {
      [sortBy]: sortOrder,
    },
    include:{
      _count:{
        select:{
          comments:true
        }
      }
    }
  });
  const total = await prisma.post.count({
    where: {
      AND: andcondition,
    },
  });

  return {
    data: allPosts,
    pagination: {
      total,
      page,
      limit,
      noOfpages: Math.ceil(total / limit),
    },
  };
};
const getPostById = async (postId: string) => {
  const result = await prisma.$transaction(async (tx) => {
    await tx.post.update({
      where: {
        id: postId,
      },

      data: {
        views: {
          increment: 1,
        },
      },
    });

    const postdetails = await tx.post.findUnique({
      where: {
        id: postId,
      },

      include: {
        comments: {
          where: {
            parentId: null,
            status: CommentStatus.APPROVED,
          },

          orderBy: {
            createdAt: "desc",
          },
          include: {
            replies: {
              include: {
                replies: true,
              },
              orderBy: {
                createdAt: "asc",
              },
            },
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
    });
    return postdetails;
  });

  return result;
};

export const postService = {
  createPost,
  getAllPosts,
  getPostById,
};
