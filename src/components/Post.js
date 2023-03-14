import React from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../service/helper";

export default function Post({ postinfo }) {
  const writer =
    postinfo.user.name.charAt(0).toUpperCase() +
    postinfo.user.name.substring(1);

    console.log(postinfo);
  const date = new Date(postinfo.addedDate);
  const postedon =
    "Posted on: " +
    date.getDate() +
    "/" +
    (date.getMonth() + 1) +
    "/" +
    date.getFullYear() +
    " " +
    date.getHours() +
    ":" +
    date.getMinutes() +
    ":" +
    date.getSeconds();

  return (
    <>
      <div className="col mb-2 mx-auto " style={{ width: "600px" }}>
        <div className="card">
          <img src={BASE_URL + "/api/post/image/" + postinfo.imageName} className="card-img-top" alt="..." style={{maxHeight:"300px",maxWidth:"100%",objectFit:"contain"}} />
          <div className="card-body">
            <h5 className="card-title" style={{ fontWeight: "bolder" }}>
              {postinfo.title}
            </h5>
            <p className="card-text">
              <b>{`Description: `}</b>
              {postinfo.content
                .toString()
                .replace(/(<([^>]+)>)/gi, "")
                .substring(0, 185)}
              ....
              <Link
                to={"/post/" + postinfo.postId}
                className="btn  btn-sm"
                style={{
                  backgroundColor: "black",
                  color: "white",
                  borderRadius: "50px"
                  
                }}
              >
                Read more
              </Link>
            </p>
            <p className="card-text" style={{margin:"0px"}}>
              <small>
                <b>{`Author: `}</b>
                {writer}
              </small>
            </p>
            <p className="card-text " style={{margin:"0px"}}>
              <small className="text-muted">{postedon}</small>
            </p>
            <div className="container text-center" style={{marginTop:"10px",marginBottom:"0px"}}>
              <h6 ><i className="fa-solid fa-thumbs-up mx-1 fa-lg " ></i>:{` `}{postinfo.likes.length} <span className="mx-2"></span> <i class="fa-solid fa-comments mx-1 fa-lg" ></i>:{` `}{postinfo.comments.length}
              </h6>
           </div>
           
          </div>
        </div>
      </div>
    </>
  );
}
