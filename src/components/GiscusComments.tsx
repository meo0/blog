"use client";

import Giscus from "@giscus/react";

export default function GiscusComments() {
  return (
    <Giscus
      repo="meo0/blog"
      repoId="REPO_ID_HERE"
      category="General"
      categoryId="CATEGORY_ID_HERE"
      mapping="pathname"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme="preferred_color_scheme"
      lang="ja"
    />
  );
}
