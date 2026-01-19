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
      className="group block p-6 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-500 transition-all duration-200"
    >
      <article className="space-y-3">
        <h3 className="text-xl font-bold group-hover:text-blue-600 transition-colors">
          {post.title}
        </h3>
        {post.date && (
          <time dateTime={post.date} className="block text-sm text-gray-500">
            {post.date}
          </time>
        )}
        {post.description && (
          <p className="text-gray-600 line-clamp-3 text-sm leading-relaxed">
            {post.description}
          </p>
        )}
      </article>
    </Link>
  );
}
