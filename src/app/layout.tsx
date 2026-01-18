import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "meo0 blog",
    template: "%s | meo0 blog"
  },
  description: "blog.meo0.com"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body style={{ maxWidth: 800, margin: "0 auto", padding: 16 }}>
        <header style={{ marginBottom: 24 }}>
          <a href="/blog">Blog</a>
        </header>
        {children}
      </body>
    </html>
  );
}
