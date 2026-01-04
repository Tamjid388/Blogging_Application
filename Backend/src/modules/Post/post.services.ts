import { Post, PostStatus } from "../../../generated/prisma/client";
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
  tags,isFeatured,status, authorId
}: {
  search: string | undefined;
  tags: string[];
  isFeatured:boolean | undefined,
  status:PostStatus | undefined,
   authorId:string 
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
  if(typeof isFeatured==="boolean"){
    andcondition.push({
      isFeatured
    })
  }
  //status
  if(status){
    andcondition.push({
      status
    })
  }
  if(authorId){
    andcondition.push({
      authorId
    })
  }
  const result = await prisma.post.findMany({
    where: {
      AND: andcondition,
    },
  });
  return result;
};

export const postService = {
  createPost,
  getAllPosts,
};
