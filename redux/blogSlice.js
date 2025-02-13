import { createSlice } from "@reduxjs/toolkit";


export const blogSlice = createSlice({
    name: 'blog',
    initialState: {
        blog: typeof window !== 'undefined' ? localStorage.getItem('blog_content') || '' : ''
    },
    reducers: {
        setBlog: (state, action) => {
            state.blog = action.payload;
            localStorage.setItem('blog_content', action.payload)
        },
    }
});

export const { setBlog } = blogSlice.actions
export default blogSlice.reducer