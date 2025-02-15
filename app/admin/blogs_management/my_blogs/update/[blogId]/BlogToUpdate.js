"use client";

import { useState, useEffect } from "react";
import RichTextEditor from "@/components/RichTextEditor";
import { useDispatch, useSelector } from "react-redux";
import { setBlog } from "@/redux/blogSlice";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const UpdateBlogPage = ({ blogFromStorage }) => {
    const storedBlog = useSelector(state => state.blog)
    const dispatch = useDispatch();
    const router = useRouter()
    const blogId = blogFromStorage?.id;

    // Set the blogFromStorage on mount in Redux store
    useEffect(() => {
        if (!storedBlog?.id || storedBlog.id !== blogFromStorage?.id) {
            dispatch(setBlog(blogFromStorage));
        }
    }, []);
    
    const [title, setTitle] = useState(storedBlog?.title || blogFromStorage?.title || '');
    const [blogContent, setBlogContent] = useState(storedBlog?.content || blogFromStorage?.content || '');
    const [isProcessing, setIsProcessing] = useState(false);

    // Handle the updating of the blog
    const handleUpdate = async (e) => {
        e.preventDefault()

        // Ensure that changes have been made before updating(Dont update the blog in the database if no changes were made)
        const formData = new FormData()
        let hasChanges = false; // Track if any changes have been made

        // Check for changes and append to formData accordingly
        if (blogFromStorage?.title !== title) {
            formData.append('title', title);
            hasChanges = true;
        }
        if (blogFromStorage?.content !== blogContent) {
            formData.append('content', blogContent);
            hasChanges = true;
        }

        if (!hasChanges) {
            toast.error("Can not update! No changes detected.");
            return;
        }

        // Proceed with sending the formData to the API route
        setIsProcessing(true);

        try {
            formData.append('id', blogId)
            const res = await fetch('/api/admin/blogs_management/update', {
                method: 'POST',
                body: formData
            })

            const result = await res.json()

            if (!res.ok) {
                console.log('Error updating blog:', result.error)
                toast.error(result.error || 'Error occured while updating blog.')
                return
            }

            toast.success(result.message);
        } catch (error) {
            console.error("Error:", error);
            toast.error(`${error}`);
        } finally {
            setIsProcessing(false)
        }
    }

    // Handle the preview action
    const handlePreview = (e, source) => {
        e.preventDefault()
        dispatch(setBlog({ id: blogId, title, content: blogContent }));
        router.push(`/admin/blogs_management/preview?from=${source}&id=${blogId}`)
    }

    return (
        <div className="">
            <div className="w-[100%] max-w-[900px] m-auto">
                <h3 className="text-center">Update blog</h3>
                <form onSubmit={handleUpdate} className="m-4 bg-white rounded-lg">
                    <div className="p-4 m-auto">
                        <div className="max-w-[700px] m-auto mb-4 flex flex-col">
                            <fieldset className="border max-w-[800px] rounded-md">
                                <legend className="text-lg font-semibold ml-3">Blog Title</legend>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Blog title here..."
                                    required
                                    className="px-3 outline-none border-none w-full rounded-md"
                                />
                            </fieldset>
                        </div>
                        <RichTextEditor editorContent={blogContent} setEditorContent={setBlogContent} />
                    </div>
                    <div className="flex gap-4 items-center justify-center pb-5">
                        <button
                            type="submit"
                            disabled={isProcessing}
                            className={`bg-blue-800 rounded-md text-white px-4 py-2 outline-none ${isProcessing ? 'cursor-not-allowed' : 'hover:bg-blue-600'}`}
                        >
                            {isProcessing ? <span className="animate-pulse">Updating...</span> : <span>Update</span>}
                        </button>
                        <button onClick={(e) => handlePreview(e, 'update')} className="bg-blue-800 rounded-md text-white hover:bg-blue-600 px-4 py-2 outline-none">Preview</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateBlogPage;
