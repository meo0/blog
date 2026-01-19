import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "meo0 blog",
    template: "%s | meo0 blog",
  },
  description: "blog.meo0.com",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="bg-gray-50 text-gray-900 font-sans antialiased min-h-screen flex flex-col">
        <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <a href="/" className="font-bold text-xl tracking-tight">
              meo0 blog
            </a>
            <nav>
                <a href="/search" className="text-sm font-medium hover:text-blue-600 transition-colors">
                    Search
                </a>
            </nav>
          </div>
        </header>
        <div className="flex-grow container mx-auto px-4 py-8 max-w-5xl">
            {children}
        </div>
        <footer className="border-t bg-white">
            <div className="container mx-auto px-4 py-6 text-center text-sm text-gray-500">
                &copy; {new Date().getFullYear()} meo0 blog. All rights reserved.
            </div>
        </footer>
      </body>
    </html>
  );
}
