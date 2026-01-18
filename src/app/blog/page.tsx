import Link from "next/link";
import { getAllPosts, getAllTags, getAllCategories } from "@/lib/posts";

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const tags = getAllTags();
  const categories = getAllCategories();

  return (
    <main>
      <h1>Blog</h1>

      <section>
        <h2>Search</h2>
        <Link href="/search">/search</Link>
      </section>

      <section>
        <h2>Tags</h2>
        <ul>
          {tags.map((t) => (
            <li key={t}>
              <Link href={`/blog/tag/${encodeURIComponent(t)}`}>{t}</Link>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Categories</h2>
        <ul>
          {categories.map((c) => (
            <li key={c}>
              <Link href={`/blog/categories/${encodeURIComponent(c)}`}>{c}</Link>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Posts</h2>
        <ul>
          {posts.map((p) => (
            <li key={p.slug}>
              <Link href={`/blog/${encodeURIComponent(p.slug)}`}>{p.title}</Link>
              {p.date ? <span> ({p.date})</span> : null}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
