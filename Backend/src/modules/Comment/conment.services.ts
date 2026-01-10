import { error } from "node:console";
import { CommentStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { date } from "better-auth/*";

type TComment = {
  content: string;
  authorId: string;
  postId: string;
  parentId: string;
};

const createComment = async (payload: TComment) => {
  const postData = await prisma.post.findUniqueOrThrow({
    where: {
      id: payload.postId,
    },
  });
  if (payload.parentId) {
    const parentData = await prisma.comment.findUniqueOrThrow({
      where: {
        id: payload.parentId,
      },
    });
  }
  return await prisma.comment.create({
    data: payload,
  });
};
//get comment by id
const getCommentById = async (commentId: string) => {
  return await prisma.comment.findUnique({
    where: {
      id: commentId,
    },
    include: {
      post: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  });
};

const getCommentsByAuthor = async (authorId: string) => {
  console.log("authorId", authorId);
  return await prisma.comment.findMany({
    where: {
      authorId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      post: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  });
};

const deleteComment = async ({
  commentId,
  userId,
}: {
  commentId: string;
  userId: string;
}) => {
  const commentData = await prisma.comment.findFirst({
    where: {
      id: commentId,
      authorId: userId,
    },
    select: {
      id: true,
    },
  });
  if (!commentData) {
    throw new Error("Your Porvided Input Is Invalid");
  }
  return await prisma.comment.delete({
    where: {
      id: commentData.id,
    },
  });
};

const updateComment = async (
  commentId: string,
  data: { content?: string; status?: CommentStatus },
  authorId: string
) => {
  const commentData = await prisma.comment.findFirst({
    where: {
      id: commentId,
      authorId,
    },
    select: {
      id: true,
    },
  });
  if (!commentData) {
    throw new Error("Your Porvided Input Is Invalid");
  }
  return await prisma.comment.update({
    where: {
      id: commentId,
      authorId,
    },
    data: data,
  });
};

const moderateComments = async (commentId:string,body:{status:CommentStatus}) => {
   const commentData=await prisma.comment.findUniqueOrThrow({
    where:{
        id:commentId
    },select:{
        id:true,
        status:true
    }
   })
   if(commentData.status===body.status){
    throw new Error(`Your Provided status ${body.status} is already up to date`)
   }
   return await prisma.comment.update({
    where:{
        id:commentId
    },
    data:body
   })
};


export const commentServices = {
  createComment,
  getCommentById,
  getCommentsByAuthor,
  deleteComment,
  updateComment,
  moderateComments
};
