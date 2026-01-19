import Link from "next/link";
import { getAllPosts, getAllTags, getAllCategories } from "@/lib/posts";

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const tags = getAllTags();
  const categories = getAllCategories();

  return (
    <main className="space-y-12">
      <section className="text-center space-y-4 py-8">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Blog</h1>
        <p className="text-xl text-gray-500">Welcome to my personal blog.</p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight mb-6">Latest Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${encodeURIComponent(p.slug)}`}
              className="group block p-6 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-500 transition-all duration-200"
            >
              <article className="space-y-2">
                <h3 className="text-xl font-semibold group-hover:text-blue-600 transition-colors">
                  {p.title}
                </h3>
                {p.date && (
                  <p className="text-sm text-gray-500">
                    {p.date}
                  </p>
                )}
                {p.description && (
                   <p className="text-gray-600 line-clamp-3 text-sm">
                       {p.description}
                   </p>
                )}
              </article>
            </Link>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t">
        <section>
          <h2 className="text-lg font-semibold mb-4">Tags</h2>
          <div className="flex flex-wrap gap-2">
            {tags.map((t) => (
              <Link
                key={t}
                href={`/blog/tag/${encodeURIComponent(t)}`}
                className="px-3 py-1 bg-gray-100 text-sm rounded-full hover:bg-gray-200 transition-colors"
              >
                {t}
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-4">Categories</h2>
          <ul className="space-y-2">
            {categories.map((c) => (
              <li key={c}>
                <Link
                  href={`/blog/categories/${encodeURIComponent(c)}`}
                  className="text-gray-600 hover:text-blue-600 transition-colors flex items-center"
                >
                  <span className="w-2 h-2 bg-gray-300 rounded-full mr-2"></span>
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
