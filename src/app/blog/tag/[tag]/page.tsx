import Link from "next/link";
import { getAllPosts, getAllTags } from "@/lib/posts";

export function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag }));
}

export default function TagPage({ params }: { params: { tag: string } }) {
  const tag = decodeURIComponent(params.tag);
  const posts = getAllPosts().filter((p) => p.tags.includes(tag));

  return (
    <main>
      <h1>Tag: {tag}</h1>
      <ul>
        {posts.map((p) => (
          <li key={p.slug}>
            <Link href={`/blog/${encodeURIComponent(p.slug)}`}>{p.title}</Link>
          </li>
        ))}
      </ul>
      <p>
        <Link href="/blog">Back</Link>
      </p>
    </main>
  );
}
