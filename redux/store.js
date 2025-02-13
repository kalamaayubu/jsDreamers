import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./blogSlice";
import authReducer from "./authSlice";

export const store = configureStore({
    reducer: {
        blog: blogReducer,
        auth: authReducer
    }
})