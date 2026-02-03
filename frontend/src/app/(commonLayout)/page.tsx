import BlogCard from "@/components/modules/homePage/BlogCard";
import { blogService } from "@/services/blog.service";

import { BlogPost } from "@/types";

export default async function Home() {
  const { data: blogs } = await blogService.getBlogPosts(
    {
      isFeatured: false,
    },
    {
      cache: "no-store",
    },
  );

  const allBlogs = blogs?.result?.data;
  console.log(allBlogs);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto px-4 gap-6">
      {allBlogs?.map((post: BlogPost) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
}
