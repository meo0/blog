import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { renderMarkdownToHtml } from "@/lib/markdown";
import GiscusComments from "@/components/GiscusComments";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) return <main>Not found</main>;

  const html = await renderMarkdownToHtml(post.content);

  return (
    <main>
      <h1>{post.title}</h1>
      {post.date ? <p>{post.date}</p> : null}
      {post.description ? <p>{post.description}</p> : null}

      <article dangerouslySetInnerHTML={{ __html: html }} />

      <hr />
      <GiscusComments />
    </main>
  );
}
