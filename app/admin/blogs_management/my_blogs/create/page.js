'use client'

import RichTextEditor from "@/components/RichTextEditor"
import { setBlog } from "@/redux/blogSlice"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"

const CreateBlogPage = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const blog = useSelector(state => state.blog.blog)

    const [title, setTitle] = useState('')
    const [file, setFile] = useState(null)
    const [blogContent, setBlogContent] = useState(() => blog || "")
    const [isProcessing, setIsProcessing] = useState(false)

    // Function to publish the blog
    const handlePublish = async (e) => {
        e.preventDefault()
        dispatch(setBlog(blogContent))
        setIsProcessing(true)

        console.log(blogContent)

        try {
            const formData = new FormData()
            formData.append('title', title)
            formData.append('content', blogContent)
            if (file) {
                formData.append('blogImage', file)
            }

            // Send an api request to publish a blog
            const res = await fetch('/api/admin/blogs_management/publish', {
                method: 'POST',
                body: formData
            })

            const result = await res.json()

            if (!res.ok) {
                console.error(`Error publishing blog:`, result.error)
                toast.error(result.error || "Error occurred while publishing blog!");
            } 

            if (result.success) {
                console.log('Blog published successfully')
                toast.success(result.message || '✅ Blog published successfully')
                return
            }
        } catch(err){
            console.error("Error publishing blog:", err);
            toast.error("Network error. Try again!");
        } finally {
            setIsProcessing(false)
        }
    };

    // Handle the preview action
    const handlePreview = (e, source) => {
        e.preventDefault()
        dispatch(setBlog(blogContent))
        router.push(`/admin/blogs_management/preview?from=${source}`)
    }

  return (
    <div className="">
        <div className="w-[100%] max-w-[900px] m-auto">
            <h3 className="text-center">Create new blog</h3>
            <div >
                <form onSubmit={handlePublish} className="bg-white p-4 rounded-lg">
                    <div className="p-4 m-auto">
                        <div className="max-w-[700px] m-auto mb-4 flex flex-col">
                            <input 
                                type="text" 
                                value={title} 
                                onChange={(e) => setTitle(e.target.value)} 
                                placeholder="Blog title here..." 
                                required 
                                className="px-3 mb-4 py-2 outline-none border max-w-[800px] rounded-md"
                            />
                            <input 
                                type="file" 
                                onChange={(e) => setFile(e.target.files[0])} 
                                required 
                                className="py-2 px-3 border mb-3 max-w-[800px] rounded-md"
                            />
                        </div>
                        <RichTextEditor 
                            editorContent={blogContent} 
                            setEditorContent={setBlogContent}
                        />
                    </div>
                    <div className="flex gap-4 items-center justify-center">
                        <button 
                            type="submit" 
                            disabled={isProcessing} 
                            className={`bg-blue-800 rounded-md text-white px-4 py-2 outline-none 
                                ${isProcessing ? 'cursor-not-allowed' : 'hover:bg-blue-600'}
                            `}
                        >
                            { isProcessing ? (
                                <span className={`animate-pulse`}>Publishing...</span>
                            ) : ( 
                                <span>Publish</span>
                            ) }
                        </button>
                        <button 
                            onClick={(e) => handlePreview(e, 'create')} 
                            className="bg-blue-800 rounded-md text-white hover:bg-blue-600 px-4 py-2 outline-none"
                        >
                            Preview
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default CreateBlogPage