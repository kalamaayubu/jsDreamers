"use client";

import { useState, useEffect } from "react";
import RichTextEditor from "@/components/RichTextEditor";
import { useDispatch, useSelector } from "react-redux";
import { setBlog } from "@/redux/blogSlice";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";

const UpdateBlogPage = ({ blogFromStorage }) => {
    const storedBlog = useSelector(state => state.blog.blog)
    const dispatch = useDispatch();
    const router = useRouter()
    const pathname = usePathname()
    const blogId = blogFromStorage?.id;

    // Tracking states
    const [title, setTitle] = useState(storedBlog?.title || blogFromStorage?.title || '');
    const [blogContent, setBlogContent] = useState(storedBlog?.content || blogFromStorage?.content || '');
    const [isProcessing, setIsProcessing] = useState(false);


    // Set the blogFromStorage on mount in Redux store
    useEffect(() => {
        if (!storedBlog?.id || storedBlog.id !== blogFromStorage?.id) {
            dispatch(setBlog(blogFromStorage));
        } else {
        }
    }, [pathname]);
    
    // Handle the updating of the blog
    const handleUpdate = async (e) => {
        e.preventDefault()
        setIsProcessing(true)

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
            <div className="w-[100%] max-w-[900px] flex flex-col m-auto bg-white">
                <h3 className="text-center text-2xl py-8">Update blog</h3>
                <div className="flex gap-4 items-center justify-center pb-5 self-end px-8">
                    <button
                        type="submit"
                        disabled={isProcessing}
                        className={`border-2 border-blue-600 hover:text-white rounded-lg hover:bg-blue-600 text-black px-4 py-2 outline-none ${isProcessing ? 'cursor-not-allowed' : ''}`}
                    >
                        {isProcessing ? <span className="animate-pulse">Updating...</span> : <span>Update</span>}
                    </button>
                    <button onClick={(e) => handlePreview(e, 'update')} className="bg-blue-600 border-2 border-blue-600 hover:bg-white rounded-md text-white hover:text-black px-4 py-2 outline-none">Preview</button>
                </div>
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
                </form>
            </div>
        </div>
    );
};

export default UpdateBlogPage;
