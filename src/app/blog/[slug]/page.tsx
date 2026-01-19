import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { renderMarkdownToHtml } from "@/lib/markdown";
import GiscusComments from "@/components/GiscusComments";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const slug = decodeURIComponent(params.slug);
  const post = getPostBySlug(slug);
  if (!post) return (
      <main className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Not found</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">The post you are looking for does not exist.</p>
      </main>
  );

  const html = await renderMarkdownToHtml(post.content);

  return (
    <main className="max-w-3xl mx-auto">
      <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4 text-gray-900 dark:text-gray-100">{post.title}</h1>
          <div className="flex justify-center items-center text-gray-500 dark:text-gray-400 space-x-4">
            {post.date && <time dateTime={post.date}>{post.date}</time>}
          </div>
          {post.description && <p className="text-xl text-gray-600 dark:text-gray-300 mt-4 leading-relaxed">{post.description}</p>}
      </header>
      
      <article 
        className="prose prose-lg dark:prose-invert mx-auto"
        dangerouslySetInnerHTML={{ __html: html }} 
      />

      <hr className="my-12 border-gray-200 dark:border-gray-800" />
      <GiscusComments />
    </main>
  );
}
