import Link from "next/link";

type Post = {
  slug: string;
  title: string;
  date?: string;
  description?: string;
};

export default function PostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${encodeURIComponent(post.slug)}`}
      className="group block p-6 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-200"
    >
      <article className="space-y-3">
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {post.title}
        </h3>
        {post.date && (
          <time dateTime={post.date} className="block text-sm text-gray-500 dark:text-gray-400">
            {post.date}
          </time>
        )}
        {post.description && (
          <p className="text-gray-600 dark:text-gray-300 line-clamp-3 text-sm leading-relaxed">
            {post.description}
          </p>
        )}
      </article>
    </Link>
  );
}
