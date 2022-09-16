import { configureStore } from "@reduxjs/toolkit";

export const RootReducer = configureStore({
    reducer: {
        blog: () => "Firebase and RTK-Query!"
    },
});



