import BlogCard from "@/components/modules/homePage/BlogCard";
import { blogService } from "@/services/blog.service";
import { userService } from "@/services/user.service";
import { BlogPost } from "@/types";
import { cookies } from "next/headers";

export default async function Home() {
const {data}=await userService.getSession()
// console.log(data?.user);
const {data:blogs}=await blogService.getBlogPosts({
  isFeatured:true,
 
},{
 cache:"no-store"
})
console.log(blogs.result.data);
const allBlogs=blogs.result.data
  return (
    <div className="grid grid-cols-3 max-w-7xl mx-auto px-4 gap-6">
      {allBlogs.map((post: BlogPost) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
}
