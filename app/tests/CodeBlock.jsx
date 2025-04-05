"use client"; // Required in Next.js App Router

import { useEffect } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-javascript"; // Import JavaScript syntax
import "prismjs/plugins/line-numbers/prism-line-numbers"; // Optional: Line numbers

const CodeBlock = ({ code, language = "javascript" }) => {
  useEffect(() => {
    Prism.highlightAll(); // Highlight code on mount
  }, []);

  return (
    <pre className={`language-${language} m-auto`}>
      <code>{code}</code>
    </pre>
  );
};

export default CodeBlock;
