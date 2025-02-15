"use client";

import { deleteBlog } from "@/actions/blogs/deleteBlog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";

const DeleteBlogBtn = ({ blogTitle, blogId }) => {
  const [title, setTitle] = useState("");
  const [open, setOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Function to handle deletion of a blog
  const handleDelete = async () => {
    setIsProcessing(true);
    try {
      const res = await deleteBlog(blogId);

      if (res.success) {
        toast.success(res.message);
        setOpen(false);
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      console.error("Failed to delete blog:", error);
    } finally {
      setIsProcessing(false);
    }
  };
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen} className="">
        <DialogTrigger>
          <Image
            width={20}
            height={20}
            src={"/assets/delete.svg"}
            title="delete"
            alt="delete"
            className="opacity-0 cursor-pointer group-hover:opacity-100 transition-all duration-700"
          />
        </DialogTrigger>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              ⚠️ This will permanently delete your blog. Enter "{blogTitle}" to
              continue.
            </DialogDescription>
          </DialogHeader>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title here..."
            className="ring-2 rounded-md border-none ring-red-500"
          />
          <DialogFooter className={`flex flex-row gap-8 justify-around`}>
            <button
              onClick={(e) => setOpen(false)}
              type="submit"
              className="bg-gray-300 rounded-md px-8"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isProcessing || title !== blogTitle}
              onClick={handleDelete}
              className={`rounded-md px-8 ${
                title === blogTitle
                  ? "bg-red-600 text-white"
                  : "bg-gray-300 cursor-not-allowed opacity-90"
              } ${
                isProcessing
                  ? "cursor-not-allowed opacity-60"
                  : "hover:bg-red-500"
              }`}
            >
              {isProcessing ? "deleting..." : "delete"}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeleteBlogBtn;
