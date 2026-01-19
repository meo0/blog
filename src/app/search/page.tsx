"use client";

import { useEffect, useState } from "react";
import PostCard from "@/components/PostCard";

type PagefindModule = {
  search: (q: string) => Promise<{ results: Array<{ id: string; data: () => Promise<any> }> }>;
};

export default function SearchPage() {
  const [q, setQ] = useState(""); // Input value
  const [searchQuery, setSearchQuery] = useState(""); // Actual search trigger
  const [items, setItems] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      if (!searchQuery.trim()) return;
      setLoading(true);
      setItems([]);

      try {
        // @ts-ignore
        const pagefind: PagefindModule = await import(/* webpackIgnore: true */ "/pagefind/pagefind.js");
        const res = await pagefind.search(searchQuery);
        const data = await Promise.all(res.results.slice(0, 20).map((r) => r.data()));

        if (!cancelled) {
          setItems(
            data.map((d: any) => ({
              slug: d.url.replace("/blog/", "").replace(".html", "").replace(/^\//, ""), // derive slug from url
              title: d.meta?.title ?? d.url,
              description: d.excerpt,
              date: d.meta?.date // pagefind might capture date if configured
            }))
          );
          setSearched(true);
        }
      } catch (e) {
        console.error("Search failed", e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [searchQuery]);

  const handleSearch = () => {
    if (q.trim()) {
       setSearchQuery(q);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <main className="max-w-4xl mx-auto space-y-8">
      <section className="text-center space-y-4">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Search</h1>
        <div className="flex max-w-lg mx-auto gap-2">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search posts..."
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 dark:placeholder-gray-400"
          />
          <button 
            onClick={handleSearch}
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Search
          </button>
        </div>
      </section>

      {loading && <p className="text-center text-gray-500 dark:text-gray-400">Searching...</p>}

      {!loading && searched && items.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400">No results found for "{searchQuery}".</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((it) => (
          <PostCard key={it.slug} post={it} />
        ))}
      </div>
    </main>
  );
}
