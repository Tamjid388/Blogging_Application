import { Request, Response } from "express";
import { postService } from "./post.services";

const createPost=async(req:Request,res:Response)=>{
   try {
    const user=req.user;
    console.log(user);
    if(!user){
       return res.status(400).json({
        message:"Unauthorized",
       
    })  
    }
    const result=await postService.createPost(req.body,user.id as string)
    res.status(201).json({
        result
    })
   } catch (error:any) {
     res.status(400).json({
        message:"Post creation failed",
        details:error
    })
   }
}
const getAllPosts=async(req:Request,res:Response)=>{
   try {
    const result=await postService.getAllPosts()
    res.status(201).json({
        success:true,
        message:"Posts Retrived Successfully",
        data:result
    })
   } catch (error:any) {
     res.status(400).json({
        success:false,
        message:"Posts Retrieval failed",
        details:error
    })
   }
}

export const postController={
    createPost,getAllPosts
}