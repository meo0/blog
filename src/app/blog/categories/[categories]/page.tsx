import Link from "next/link";
import { getAllCategories, getAllPosts } from "@/lib/posts";

export function generateStaticParams() {
  return getAllCategories().map((cat) => ({ categories: cat }));
}

export default function CategoryPage({ params }: { params: { categories: string } }) {
  const category = decodeURIComponent(params.categories);
  const posts = getAllPosts().filter((p) => p.category === category);

  return (
    <main>
      <h1>Category: {category}</h1>
      <ul>
        {posts.map((p) => (
          <li key={p.slug}>
            <Link href={`/blog/${encodeURIComponent(p.slug)}`}>{p.title}</Link>
          </li>
        ))}
      </ul>
      <p>
        <Link href="/">Back</Link>
      </p>
    </main>
  );
}
