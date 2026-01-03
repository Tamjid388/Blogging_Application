import { Post } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";


const createPost=async(data: Omit<Post,"id"|"createdAt"|"updatedAt" | "authorId">,userid:string)=>{
const result =await prisma.post.create({
  data:{
    ...data,
    authorId:userid
  }
})
return result;
}

const getAllPosts=async()=>{
    const result=await prisma.post.findMany()
    return result
}

export const postService={
    createPost,getAllPosts
}


