import { email, roblox } from "better-auth/*";
import { prisma } from "../lib/prisma";
import { error } from "node:console";

async function seedAdmin() {
  try {
    const adminData={
        name:"admin",
        email:"admin@email.com",
        role:"ADMIN",
        password:"admin1234"
    }
    const existinguser=await prisma.user.findUnique({
        where:{
            email:adminData.email
        }
    })

    if(existinguser){
        throw new Error("user already exosts")
    }
    const signupAdmin=await fetch("http://localhost:5000/api/auth/sign-up/email",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(adminData)
        }
    )
    console.log(signupAdmin);
    
  } catch (error: any) {
    console.error(error);
  }
}
seedAdmin()