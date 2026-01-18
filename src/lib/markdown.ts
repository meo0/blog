import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";

export async function renderMarkdownToHtml(markdown: string): Promise<string> {
  // 1. Regex replacement for Obsidian image syntax
  const imageRegex = /!\[\[(.*?)\s*\|\s*(\d+)\]\]/g;
  const processedMarkdown = markdown.replace(imageRegex, '<img src="$1" width="$2" />');

  // 2. Updated remark pipeline
  const result = await remark()
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .process(processedMarkdown);
  return result.toString();
}
