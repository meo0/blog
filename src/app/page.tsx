import Link from "next/link";
import { getAllPosts, getAllTags, getAllCategories } from "@/lib/posts";
import PostCard from "@/components/PostCard";

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const tags = getAllTags();
  const categories = getAllCategories();

  return (
    <main className="space-y-12">
      <section className="text-center space-y-4 py-8">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-gray-900 dark:text-gray-100">Blog</h1>
        <p className="text-xl text-gray-500 dark:text-gray-400">Welcome to my personal blog.</p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight mb-6 text-gray-900 dark:text-gray-100">Latest Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-gray-200 dark:border-gray-800">
        <section>
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Tags</h2>
          <div className="flex flex-wrap gap-2">
            {tags.map((t) => (
              <Link
                key={t}
                href={`/blog/tag/${encodeURIComponent(t)}`}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-sm rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors"
              >
                {t}
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Categories</h2>
          <ul className="space-y-2">
            {categories.map((c) => (
              <li key={c}>
                <Link
                  href={`/blog/categories/${encodeURIComponent(c)}`}
                  className="text-gray-700 dark:text-gray-300 font-medium hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white dark:hover:bg-gray-900 transition-all flex items-center p-2 rounded-md hover:shadow-sm"
                >
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  {c}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
