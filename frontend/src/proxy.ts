import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { userService } from "./services/user.service";
import { Roles } from "./constants/roles";


export async function proxy(request: NextRequest) {
  const pathName=request.nextUrl.pathname;
    let isAdmin=false;
    let isAuthenticated=false
const session = await userService.getSession();

  if (session.error) {
  
    console.error(session.error.message);
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const { data } = session;
  if(data){
    isAuthenticated=true
    isAdmin=data.user.role === Roles.admin
  }
  //-->user not authenticated
  if(!isAuthenticated){
    return NextResponse.redirect(new URL("/login",request.url))
  }
//-->user is a admin
  if(isAdmin && pathName.startsWith("/dashboard")){
    return NextResponse.redirect(new URL("/admin-dashboard",request.url))
  }
  if(!isAdmin && pathName.startsWith("/admin-dashboard")){
    return NextResponse.redirect(new URL("/dashboard",request.url))
  }

}

export const config = {
  matcher: ["/dashboard","/admin-dashboard"]
};
