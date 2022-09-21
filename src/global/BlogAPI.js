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
            async queryFn(id) {
                try {
                    const docRef = doc(db, "blogs", id);
                    const snapshot = await getDoc(docRef);
                    return {
                        data: snapshot.data()
                    }
                } catch (error) {
                    return {
                        error: error 
                    };
                }
            },
            providesTags: ["Blog"],
        }),
        create: builder.mutation({
            async queryFn(data) {
                try {
                    await addDoc(collection(db, "blogs"), {
                        ...data,
                        timestamp: serverTimestamp(),
                    });
                    return {data: "OK"};
                } catch (error) {
                    return {error: error};
                };
            },
            invalidatesTags: ["Blog"],
        }),
        update: builder.mutation({
            async queryFn({ id, blog }) {
                try {
                    await updateDoc(doc(db, "blogs", id), {
                        ...blog,
                        timestamp: serverTimestamp(),
                    });
                    return {
                        data: "ok"
                    };
                } catch (error) {
                    return {
                        error: error
                    }
                }
            },
            invalidatesTags: ["Blog"],
        }),
        delete: builder.mutation({
            async queryFn(id) {
                try {
                    await deleteDoc(doc(db, "blogs", id));
                    return {
                        data: "ok"
                    }
                } catch (error) {
                    return {
                        error: error
                    }
                }
            },
            invalidatesTags: ["Blog"],
        })
    }),
});


