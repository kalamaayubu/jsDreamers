"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";
import "react-quill-new/dist/quill.snow.css";
import NavBar from "@/components/general/NavBar";
import { useEffect } from "react";


import BlogContent from "@/components/client/BlogContent";


const PreviewPage = () => {
  // Get blog content from Redux state
  const blog = useSelector((state) => state.blog.blog.content);

  // Extract query parameters from URL
  const searchParams = useSearchParams();
  const source = searchParams.get("from");
  const id = searchParams.get("id");

  return (
    <div className="relative">
      {/* Navbar at top */}
      <NavBar />

      {/* Main blog content area */}
      <div className="ql-editor p-4 max-w-[800px] m-auto w-[80%] mt-5 sm:mt-6 lg:mt-8">
        {/* Render formatted content */}
        <BlogContent content={blog} />
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
