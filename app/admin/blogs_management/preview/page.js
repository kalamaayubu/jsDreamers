"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";
import "react-quill-new/dist/quill.snow.css";
import NavBar from "@/components/general/NavBar";
import { useEffect } from "react";

// Prism for syntax highlighting
import Prism from "prismjs";
import "prismjs/plugins/line-numbers/prism-line-numbers"; // Optional: Line numbers
import "prismjs/plugins/line-numbers/prism-line-numbers.css";


const PreviewPage = () => {
  // Get blog content from Redux state
  const blog = useSelector((state) => state.blog.blog.content);

  useEffect(() => {
    Prism.highlightAll(); // Highlight code on mount
  }, [blog]);

  // Extract query parameters from URL
  const searchParams = useSearchParams();
  const source = searchParams.get("from");
  const id = searchParams.get("id");

  // Function to decode HTML entities
  const decodeHTML = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  // Convert blog HTML string into JSX elements using DOMParser
  const formattedContent = blog
    ? (() => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(blog, "text/html");
        const elements = Array.from(doc.body.childNodes);

        return elements.map((el, index) => {
          // Handle code blocks
          if (
            el.nodeType === 1 &&
            el.classList.contains("ql-code-block-container")
          ) {
            const codeLines = Array.from(
              el.querySelectorAll(".ql-code-block")
            ).map((line) => decodeHTML(line.textContent));

            const finalCode = codeLines.join("\n");

            return (
              <pre
                key={index}
                className="language-javascript line-numbers my-4 p-4 rounded bg-gray-900 overflow-auto text-sm"
              >
                <code
                  className="language-javascript"
                  dangerouslySetInnerHTML={{
                    __html: Prism.highlight(
                      finalCode,
                      Prism.languages.javascript,
                      "javascript"
                    ),
                  }}
                />
              </pre>
            );
          }

          // Handle regular content
          return (
            <div
              key={index}
              dangerouslySetInnerHTML={{ __html: el.outerHTML }}
            />
          );
        });
      })()
    : null;

  return (
    <div className="relative">
      {/* Navbar at top */}
      <NavBar />

      {/* Main blog content area */}
      <div className="ql-editor p-4 max-w-[800px] m-auto w-[80%] mt-5 sm:mt-6 lg:mt-8">
        {formattedContent}
      </div>

      {/* Navigation link to go back */}
      <Link
        href={`/admin/blogs_management/my_blogs/${source}/${id || ""}`}
        className="text-center p-4 text-blue-700 hover:underline block"
      >
        Go back
      </Link>
    </div>
  );
};

export default PreviewPage;
