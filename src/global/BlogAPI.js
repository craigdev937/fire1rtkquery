import { db } from "../misc/firebase";
import { createApi, 
    fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { collection, doc, serverTimestamp, 
    addDoc, getDoc, getDocs, deleteDoc, updateDoc
} from "firebase/firestore";

export const BlogAPI = createApi({
    reducerPath: "BlogAPI",
    baseQuery: fakeBaseQuery(),
    tagTypes: ["Blog"],
    endpoints: (builder) => ({
        fetchAll: builder.query({
            async queryFn() {
                try {
                    const blogRef = collection(db, "blogs");
                    const querySnapshot = await getDocs(blogRef);
                    let blogs = [];
                    querySnapshot?.forEach((doc) => {
                        blogs.push({
                            id: doc.id,
                            ...doc.data(),
                        });
                    });
                    return { data: blogs };
                } catch (error) {
                    return { error: error }
                }
            },
            providesTags: ["Blog"],
        }),
        getOne: builder.query({
            
        }),
        create: builder.mutation({
            async queryFn(data) {
                try {
                    await addDoc(collection(db, "blogs"), {
                        ...data,
                        timestamp: serverTimestamp()
                    });
                    return {data: "OK"};
                } catch (error) {
                    return {error: error};
                };
            }
        })
    }),
});


