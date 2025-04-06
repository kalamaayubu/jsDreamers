/** PURPOSE:
 * This component is designed to render blog content with syntax highlighting for code blocks.
 */

"use client";

import { useEffect } from "react";
import Prism from "prismjs";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import "prismjs/plugins/line-numbers/prism-line-numbers"; // Optional: Line numbers

// Function to decode HTML entities
const decodeHTML = (html) => {
  const txt = document.createElement("textarea"); // Create a temporary textarea element to decode the HTML
  txt.innerHTML = html; // Set the HTML content, automatically decoding any HTML entities
  return txt.value;
};

const BlogContent = ({ content }) => {
  useEffect(() => {
    Prism.highlightAll(); // Automatically highlight all code blocks after render
  }, [content]);

  // Convert blog HTML string into JSX elements using DOMParser
  const formattedContent = content
    ? (() => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(content, "text/html");
        const elements = Array.from(doc.body.childNodes);

        return elements.map((el, index) => {
          // If it's an element node and has the class "ql-code-block-container"
          if (
            el.nodeType === 1 &&
            el.classList.contains("ql-code-block-container")
          ) {
            // Decode each ql-code-block line and store in codeLines
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

  return <div className="ql-editor">{formattedContent}</div>;
};

export default BlogContent;
