import { prisma } from "../../lib/prisma"

type TComment={
    content:string,
    authorId:string,
    postId:string,
    parentId:string
}

const createComment=async(payload:TComment)=>{
 const postData=await prisma.post.findUniqueOrThrow({
    where:{
        id:payload.postId
    }
 })   
 if(payload.parentId){
    const parentData=await prisma.comment.findUniqueOrThrow({
        where:{
            id:payload.parentId
        }
    })
 }
return await prisma.comment.create({
    data:payload
})
}
//get comment by id
const getCommentById=async(commentId:string)=>{
return await prisma.comment.findUnique({
    where:{
        id:commentId
    },
    include:{
        post:{
            select:{
                id:true,
                title:true
            }
        }
    }
})
}

const getCommentsByAuthor=async(authorId:string)=>{
    console.log('authorId',authorId);
return await prisma.comment.findMany({
    where:{
       authorId
    },
    orderBy:{
        createdAt:"desc"
    },
    include:{
        post:{
            select:{
                id:true,
                title:true
            }
        }
    }
})
}


const deleteComment=async({commentId,userId}:{
    commentId:string;
    userId:string
})=>{
const commentData=await prisma.comment.findFirst({
    where:{
        id:commentId,
        authorId:userId
    },select:{
        id:true
    }
})
if(!commentData){
    throw new Error("Your Porvided Input Is Invalid")
}
return await prisma.comment.delete({
    where:{
        id:commentData.id
    }
})
}
export const commentServices={
    createComment,getCommentById,getCommentsByAuthor,deleteComment
}