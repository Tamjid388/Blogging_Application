import { Badge } from "@/components/ui/badge";
import { blogService } from "@/services/blog.service";
import { BlogPost } from "@/types";

export async function generateStaticParams() {
  const { data } = await blogService.getBlogPosts();
  return data?.result?.data
    ?.map((blog: BlogPost) => ({ id: blog.id }))
    .splice(0, 3);
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: blogDetails } = await blogService.getBlogById(id);

  const blog = blogDetails?.result;

  if (!blog) {
    return (
      <div className="max-w-3xl mx-auto py-20 text-center">
        <h2 className="text-2xl font-semibold text-red-500 dark:text-red-400">
          Blog not found
        </h2>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      {/* Title */}
      <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        {blog.title}
      </h1>

      {/* Meta */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
        <span>📅 {new Date(blog.createdAt).toLocaleDateString()}</span>
        <span>👁️ {blog.views} views</span>
        <span className="capitalize">
          {blog.status === "PUBLISHED" ? "🟢 Published" : blog.status}
        </span>
      </div>

      {/* Tags */}
      {blog.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {blog?.tags?.map((tag: string) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              #{tag}
            </Badge>
          ))}
        </div>
      )}

      {/* Content */}
      <div
        className="
          prose prose-lg max-w-none
          prose-gray
          dark:prose-invert
        "
      >
        {blog.content}
      </div>

      {/* Footer */}
      <div className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-6 flex flex-col sm:flex-row justify-between gap-3 text-sm text-gray-500 dark:text-gray-400">
        <span>Author ID: {blog.authorId}</span>
        <span>Updated: {new Date(blog.updatedAt).toLocaleDateString()}</span>
      </div>
    </article>
  );
}
