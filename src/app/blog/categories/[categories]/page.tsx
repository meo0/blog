import Link from "next/link";
import { getAllCategories, getAllPosts } from "@/lib/posts";
import PostCard from "@/components/PostCard";

export function generateStaticParams() {
  return getAllCategories().map((cat) => ({ categories: cat }));
}

export default function CategoryPage({ params }: { params: { categories: string } }) {
  const category = decodeURIComponent(params.categories);
  const posts = getAllPosts().filter((p) => p.category === category);

  return (
    <main>
      <div className="mb-8">
        <Link href="/" className="text-sm text-gray-500 hover:text-blue-600 mb-4 inline-block">&larr; Back to Home</Link>
        <h1 className="text-3xl font-bold tracking-tight">Category: <span className="text-blue-600">{category}</span></h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((p) => (
          <PostCard key={p.slug} post={p} />
        ))}
      </div>
    </main>
  );
}
