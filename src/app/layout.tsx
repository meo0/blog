import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";

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
    <html lang="ja" suppressHydrationWarning>
      <body className="bg-gray-50 text-gray-900 font-sans antialiased min-h-screen flex flex-col dark:bg-gray-950 dark:text-gray-50 transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Navbar />
            <div className="flex-grow container mx-auto px-4 py-8 max-w-5xl">
                {children}
            </div>
            <footer className="border-t bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 transition-colors duration-300">
                <div className="container mx-auto px-4 py-6 text-center text-sm text-gray-500 dark:text-gray-400">
                    &copy; {new Date().getFullYear()} meo0 blog. All rights reserved.
                </div>
            </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
