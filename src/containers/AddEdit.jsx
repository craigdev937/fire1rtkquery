import React from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { storage } from "../misc/firebase";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { BlogAPI } from "../global/BlogAPI";
import { ref, uploadBytesResumable, 
    getDownloadURL } from "firebase/storage";
import { MDBBtn, MDBCard, MDBCardBody, 
    MDBInput, MDBTextArea, MDBValidation, 
    MDBValidationItem } from "mdb-react-ui-kit";

export const AddEdit = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [data, setData] = React.useState({
        title: "", description: ""
    });
    const [file, setFile] = React.useState(null);
    const [progress, setProgress] = React.useState(null);
    const [addBlog] = BlogAPI.useCreateMutation();
    
    const { data: blog } = BlogAPI.useGetOneQuery(id ? id : skipToken);
    const [updateBlog] = BlogAPI.useUpdateMutation();
    const { title, description } = data;

    React.useEffect(() => {
        if (id && blog) {
            setData({...blog});
        }
    }, [id, blog]);

    React.useEffect(() => {
        const uploadFile = () => {
            const storageRef = ref(storage, file.name);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on("state_changed", (snapshot) => {
                    const progress = (snapshot.bytesTransferred / 
                        snapshot.totalBytes) * 100;
                    console.log("Upload is " + progress + "% done");
                    setProgress(progress);
                    switch (snapshot.state) {
                        case "paused":
                            console.log("Upload is paused");
                            break;
                        case "running":
                            console.log("Upload is running");
                            break;
                        default:
                            break;
                    };
                }, (error) => {
                    console.log(error)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {
                        toast.info("Image Upload Success!");
                        setData((prev) => ({
                            ...prev, imgURL: downloadURL
                        }));
                    })
                });
        };
        file && uploadFile();
    }, [file]);

    const handleChange = (event) => {
        setData({...data, [event.target.name]: 
            event.target.value});
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (title && description) {
            if (!id) {
                await addBlog(data);
                toast.success("The Blog was added!");
                navigate("/");
            } else {
                await updateBlog(id, blog);
                toast.update("The Blog was updated!");
                navigate("/");
            }
        }
    };

    return (
        <main className="addEdit">
            <MDBCard alignment="center">
                <h4 className="fw-bold">{id ? "Update Blog" : "Create Blog"}</h4>
                <MDBCardBody>
                    <MDBValidation 
                        className="row g-3" 
                        noValidate 
                        onSubmit={handleSubmit}>
                        <MDBValidationItem 
                            className="col-md-12" 
                            feedback="Please provide title"
                            invalid>
                            <MDBInput 
                                required
                                className="form-control"
                                label="Title"
                                name="title"
                                type="text"
                                value={title}
                                onChange={handleChange}
                            />
                        </MDBValidationItem>
                        <MDBValidationItem 
                            className="col-md-12" 
                            feedback="Please provide title"
                            invalid>
                            <MDBTextArea 
                                required
                                className="form-control"
                                label="Description"
                                name="description"
                                type="text"
                                rows={4}
                                value={description}
                                onChange={handleChange}
                            />
                        </MDBValidationItem>
                        <section className="col-md-12">
                            <MDBInput 
                                type="file" 
                                onChange={(event) => setFile(event.target.files[0])} 
                            />
                        </section>
                        <section className="col-12">
                            <MDBBtn 
                                disabled={progress !== null && progress < 100}
                                style={{width: "100%" }}
                                >{id ? "Update" : "Submit"}
                            </MDBBtn>
                        </section>
                    </MDBValidation>
                </MDBCardBody>
            </MDBCard>
        </main>
    );
};



