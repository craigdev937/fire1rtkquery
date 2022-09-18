import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Spinner } from "./Spinner";
import { BlogAPI } from "../global/BlogAPI";
import { MDBCard, MDBCardBody, MDBCardImage, 
    MDBCardTitle, MDBCol, MDBRow, 
    MDBCardText, MDBBtn, MDBIcon } from "mdb-react-ui-kit";

export const Home = () => {
    const { error, isError, isLoading, data } = BlogAPI.useFetchAllQuery();
    const [ deleteBlog ] = BlogAPI.useDeleteMutation();

    React.useEffect(() => {
        isError && toast.error(error);
    }, [isError]);
    
    if (isLoading) {
        return <Spinner />
    };

    const excerpt = (string, count) => {
        if (string.length > count) {
            string = string.substring(0, count) + "...";
        }
        return string;
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to Delete?")) {
            await deleteBlog(id);
            toast.success("The Blog was Deleted!");
        }
    };

    return (
        <main className="homeMain">
            <MDBRow className="row-cols-1 row-cols-md-3 g-4">
                {data?.map((item) => (
                    <MDBCol key={item.id}>
                        <MDBCard className="h-100">
                            <MDBCardImage 
                                position="top" 
                                src={item.imgURL} 
                                alt={item.title} 
                            />
                            <MDBCardBody>
                                <MDBCardTitle className="text-start">
                                    {item.title}
                                </MDBCardTitle>
                                <MDBCardText className="text-start">
                                    {excerpt(item.description, 80)}
                                    <Link to={`/detail/${item.id}`}>Read More</Link>
                                </MDBCardText>
                                <section style={{ marginLeft: "5px", float: "right" }}>
                                    <button 
                                        className="deleteBtn" 
                                        onClick={() => handleDelete(item.id)}
                                        >Delete
                                    </button>
                                    <Link to={`/update/${item.id}`}>
                                        <button>Update</button>
                                    </Link>
                                </section>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                ))}
            </MDBRow>
        </main>
    );
};



