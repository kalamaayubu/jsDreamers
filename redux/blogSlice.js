import { createSlice } from "@reduxjs/toolkit";

export const blogSlice = createSlice({
    name: "blog",
    initialState: {
        blog: typeof window !== "undefined"
            ? (() => {
                try {
                    return JSON.parse(localStorage.getItem("blog_content")) || {}; 
                } catch (error) {
                    console.error("Error parsing blog_content from localStorage:", error);
                    return {}; 
                }
            })()
            : {},
    },
    reducers: {
        setBlog: (state, action) => {
            state.blog = action.payload;
            localStorage.setItem("blog_content", JSON.stringify(action.payload));  // ✅ Store as JSON
        },
    },
});

export const { setBlog } = blogSlice.actions;
export default blogSlice.reducer;
