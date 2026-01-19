import Link from "next/link";
import { getAllPosts, getAllTags } from "@/lib/posts";
import PostCard from "@/components/PostCard";

export function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag }));
}

export default function TagPage({ params }: { params: { tag: string } }) {
  const tag = decodeURIComponent(params.tag);
  const posts = getAllPosts().filter((p) => p.tags.includes(tag));

  return (
    <main>
      <div className="mb-8">
        <Link href="/" className="text-sm text-gray-500 hover:text-blue-600 mb-4 inline-block">&larr; Back to Home</Link>
        <h1 className="text-3xl font-bold tracking-tight">Tag: <span className="text-blue-600">{tag}</span></h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((p) => (
          <PostCard key={p.slug} post={p} />
        ))}
      </div>
    </main>
  );
}
