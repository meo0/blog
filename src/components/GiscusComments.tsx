"use client";

import Giscus from "@giscus/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function GiscusComments() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="mt-10 pt-10 border-t border-gray-200 dark:border-gray-800">
        <Giscus
        repo="meo0/blog"
        repoId="R_kgDOQ8Il0g"
        category="General"
        categoryId="DIC_kwDOQ8Il0s4C1G0l"
        mapping="pathname"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={resolvedTheme === "dark" ? "dark" : "light"}
        lang="ja"
        loading="lazy"
        />
    </div>
  );
}
