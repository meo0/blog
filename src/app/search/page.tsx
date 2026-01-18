"use client";

import { useEffect, useState } from "react";

type PagefindModule = {
  search: (q: string) => Promise<{ results: Array<{ id: string; data: () => Promise<any> }> }>;
};

export default function SearchPage() {
  const [q, setQ] = useState("");
  const [items, setItems] = useState<Array<{ url: string; title: string }>>([]);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      setItems([]);
      if (!q.trim()) return;

      // @ts-ignore
      const pagefind: PagefindModule = await import(/* webpackIgnore: true */ "/pagefind/pagefind.js");
      const res = await pagefind.search(q);
      const data = await Promise.all(res.results.slice(0, 20).map((r) => r.data()));

      if (!cancelled) {
        setItems(
          data.map((d: any) => ({
            url: d.url,
            title: d.meta?.title ?? d.url
          }))
        );
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [q]);

  return (
    <main>
      <h1>Search</h1>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="search..."
        style={{ width: "100%", padding: 8 }}
      />

      <ul>
        {items.map((it) => (
          <li key={it.url}>
            <a href={it.url}>{it.title}</a>
          </li>
        ))}
      </ul>
    </main>
  );
}
