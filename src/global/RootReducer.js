import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { BlogAPI } from "./BlogAPI";

export const RootReducer = configureStore({
    reducer: {
        [BlogAPI.reducerPath]: BlogAPI.reducer
    },
    middleware: (gDM) => gDM().concat(BlogAPI.middleware)
});

setupListeners(RootReducer.dispatch);



