'use client'

import Link from "next/link"
import { useSelector } from "react-redux"
import "react-quill-new/dist/quill.snow.css"; // Styles for the quill text-editor
import NavBar from "@/components/general/NavBar";
import { useSearchParams } from "next/navigation";


const PreviewPage = () => {
    const blog = useSelector(state => state.blog.blog.content)
    const searchParams = useSearchParams()
    const source = searchParams.get('from') // Get the origin of navigation to preview page
    const id = searchParams.get('id')

  return (
    <div className="relative">
        <NavBar/>
    
    <div 
        className="ql-editor p-4 max-w-[800px] m-auto w-[80%]"
        dangerouslySetInnerHTML={{__html: blog}}
    >
    </div>
      <Link href={`/admin/blogs_management/my_blogs/${source}/${id ? id : ''}`} className="text-center p-4 text-blue-700 hover:underline">Go back</Link>
    </div>
  )
}

export default PreviewPage