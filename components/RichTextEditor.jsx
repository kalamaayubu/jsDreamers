"use client";

import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css"; // Import the snow theme styles
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, false] }],
    [{ font: [] }],
    [{ list: "ordered" }],
    ["bold", "italic", "underline", "strike"],
    [{ script: "super" }, { script: "sub" }],
    ["code-block"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [{ size: ["small", false, "large", "huge"] }],
    ["link", "image", "video"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "font",
  "bold",
  "italic",
  "underline",
  "strike",
  "script",
  "code-block",
  "list",
  "align",
  "size",
  "color",
  "background",
  "link",
  "image",
  "video",
];

const BlogEditor = ({ editorContent, setEditorContent }) => {
  return (
    <div className=" m-auto w-full">
      <ReactQuill
        value={editorContent}
        onChange={setEditorContent}
        modules={modules}
        formats={formats}
        placeholder="Start typing here..."
        className="border rounded-md"
      />
    </div>
  );
};

export default BlogEditor;
