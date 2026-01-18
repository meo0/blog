import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type Post = {
  slug: string;
  title: string;
  date: string; // ISO string推奨
  description?: string;
  tags: string[];
  category?: string;
  draft?: boolean;
  content: string;
};

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

function walk(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) files.push(...walk(full));
    else if (e.isFile() && e.name.endsWith(".md")) files.push(full);
  }
  return files;
}

function filePathToSlug(filePath: string): string {
  const rel = path.relative(POSTS_DIR, filePath).replaceAll(path.sep, "/");
  return rel.replace(/\.md$/, "");
}

export function getAllPosts(): Post[] {
  const files = walk(POSTS_DIR);
  const posts = files.map((filePath) => {
    const raw = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(raw);

    const slug = filePathToSlug(filePath);
    const title = String(data.title ?? slug);
    const date = String(data.date ?? "");
    const description = data.description ? String(data.description) : undefined;
    const tags = Array.isArray(data.tags) ? data.tags.map(String) : [];
    const category = data.category ? String(data.category) : undefined;
    const draft = Boolean(data.draft ?? false);

    return { slug, title, date, description, tags, category, draft, content };
  });

  return posts
    .filter((p) => !p.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function getAllTags(): string[] {
  const set = new Set<string>();
  for (const p of getAllPosts()) for (const t of p.tags) set.add(t);
  return [...set].sort();
}

export function getAllCategories(): string[] {
  const set = new Set<string>();
  for (const p of getAllPosts()) if (p.category) set.add(p.category);
  return [...set].sort();
}
