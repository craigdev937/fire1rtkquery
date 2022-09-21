import React from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { BlogAPI } from "../global/BlogAPI";
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCardTitle, MDBTypography
 } from "mdb-react-ui-kit";

export const Detail = () => {
    const { id } = useParams();
    const { error, isError, data: blog } = 
        BlogAPI.useGetOneQuery(id ? id : skipToken);

    React.useEffect(() => {
        isError && toast.error(error);
    }, [isError]);

    return (
        <React.Fragment>
        <MDBCard className="mb-3">
            <MDBCardImage 
                position="top" 
                src={blog?.imgURL} 
                alt={blog?.title} 
                style={{ height: "600px" }}
            />
            <MDBCardBody>
                <MDBCardTitle className="h3 fw-bold">{blog?.title}</MDBCardTitle>
                <MDBCardText className="text-start">
                    <span className="fw-bold">Created at - &nbsp;</span>
                    <small className="text-muted h6">
                        {blog?.timestamp.toDate().toLocaleString()}
                    </small>
                </MDBCardText>
                <MDBTypography blockquote className="text-start mb-0">
                    {blog?.description}
                </MDBTypography>
            </MDBCardBody>
        </MDBCard>
        </React.Fragment>
    );
};



