import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getUserdetails, isLogin } from "../Auth";
import { isLiked, postComment, postLike } from "../service/Comment-service";
import { BASE_URL } from "../service/helper";
import { getPostbyId } from "../service/Post-service";
import Comments from "./Comment";

export default function Postpage() {
  const { postId } = useParams();

  const [postcontent, setPostcontent] = useState();
  const [doComment, setDoComment] = useState(false);
  const [doLike, setDoLike] = useState(false);
  const [commentData, setCommentData] = useState({
    content: "",
    userId: "",
    postId: "",
  });
  const currentuser=getUserdetails();

  function loadPostbyid(){
    getPostbyId(postId)
    .then((data) => {
      console.log(data);
      setPostcontent(data);
    })
    .catch((error) => {
      // console.log(error);
      toast.error("Unable to load data");
    });
  }


  useEffect(() => {
    //loading post by id
    loadPostbyid();
   
  }, []);


  //posting comment 
  const postcommentHandler = () => {
    if (commentData.content.trim() === "") {
      toast.error("Type your comment to post");
      return;
    }

    commentData["userId"] = currentuser.id;
    commentData["postId"] = postcontent.postId;
    // console.log(  commentData.content.trim()==="");

    postComment(commentData)
      .then((data) => {
        setPostcontent({
          ...postcontent,
          comments: [...postcontent.comments, data.data],
        });
        setCommentData({
          content: "",
          userId: "",
          postId: "",
        });
        toast.success("success! comment posted");
        loadPostbyid();
        console.log(postcontent);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Server error!! Unable to comment");
      });
  };

  const navigate = useNavigate();

  
  
  

  useEffect(() => {
    //checking wheather post is liked or not
    console.log(postcontent);
    
    console.log(currentuser && currentuser.id);

    (postcontent) &&(currentuser) && isLiked(currentuser.id,postcontent.postId)
    .then((data)=>{
      console.log(data);
      if(data!=="" && data.userid===currentuser.id){
        setDoLike(true);
      }
    }).catch((error)=>{
      console.log(error)
    });
  }, [postcontent]);

  const commentHandler = () => {
    doComment ? setDoComment(false) : setDoComment(true);
  };

  const likeHandler = () => {
    if(doLike){
      toast.warning("Already liked!!!");
      return ;
    }
    
    if(isLogin()===false){
      toast.error("Login to like the post")
      return ;
    }
    postLike(currentuser.id,postcontent.postId)
    .then((data)=>{
      // console.log(data);
      setDoLike(true);
      setPostcontent({
        ...postcontent,
        likes:[...postcontent.likes,data.likeUserName]
        
      })
    }).catch((error)=>{
      console.log(error)
    });
  };

  const date = new Date(postcontent?.addedDate);
  const postedon =
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

  const topHandler = () => {
    window.scroll(0, 0);
  };

  return (
    <>
      {postcontent && (
        <div className="container mt-4 mb-4 ">
          <Link to={"/feeds"}>Feeds</Link>/<span>{postcontent.title}</span>
          <br />
          <button
            className="btn btn-sm mt-2"
            onClick={() => navigate(-1)}
            style={{ backgroundColor: "black", color: "white" }}
          >
            <i className="fa-solid fa-angles-left"></i>Go Back
          </button>
          <div className="card mt-2 mx-auto shadow" style={{ width: "100%" }}>
            <div className="card-body mx-2">
              <h2 className="card-title">
                <u>{postcontent.title}</u>
              </h2>
              <h5 className="card-subtitle  text-muted">
                Posted by: {postcontent.user.name} on {postedon}
              </h5>
              <br />
              <h6 className="card-subtitle  text-muted">
                Category: {postcontent.category.categoryTitle}{" "}
              </h6>
              <br />

              <img
                src={BASE_URL + "/api/post/image/" + postcontent.imageName}
                className="img-fluid mt-3 mx-auto d-block  "
                alt=""
                style={{ maxWidth: "60%" }}
              />
              <p
                className="card-text mt-5"
                dangerouslySetInnerHTML={{ __html: postcontent.content }}
              ></p>
            </div>
            <div className="container ">
              <p style={{ marginRight: "25%", marginLeft: "14%" }}>
                {postcontent.likes.length}
                {` Likes`} <b>{` · `}</b>
                {postcontent.comments.length}
                {` comments`}
              </p>
            </div>

            <div
              className="container "
              style={{ marginBottom: "20px", marginTop: "0px" }}
            >
              <button
                className="btn border-0"
                style={{ marginRight: "15%", marginLeft: "13%" }}
                onClick={likeHandler}
              >
                <i
                  className={
                    doLike
                      ? "fa fa-heart fa-2xl"
                      : "fa-regular fa-heart fa-beat fa-2xl fa-2xl"
                  }
                  style={
                    doLike ? { color: "red" } : { animationDuration: "5s" }
                  }
                ></i>
                <b style={{ fontSize: "18px",color:doLike? "red":"black" }}>{doLike?"Liked!":"Like"}</b>
              </button>

              <button
                className="btn "
                style={{
                  backgroundColor: "black",
                  color: "white",
                  marginRight: "10%",
                  marginLeft: "10%",
                }}
                onClick={topHandler}
              >
                <i className="fa-solid fa-angles-up"></i>Back to Top
              </button>

              <button
                className="btn border-0"
                style={{ marginRight: "0%", marginLeft: "9%" }}
                onClick={commentHandler}
              >
                <i
                  className={
                    doComment
                      ? "fa fa-comment fa-2xl"
                      : "fa-regular fa-comment fa-2xl fa-beat"
                  }
                  style={doComment ? {} : { animationDuration: "5s" }}
                ></i>
                <b style={{ fontSize: "18px" }}>Comment</b>
              </button>
            </div>
            {doComment && (
              <div className="container " style={{ width: "75%" }}>
                <label
                  htmlFor="exampleFormControlTextarea1"
                  className="form-label text-decoration-underline"
                  style={{ fontWeight: "bolder", fontSize: "18px" }}
                >
                  Comments{" "}
                </label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  placeholder="Start typing comment"
                  value={commentData.content}
                  onChange={(event) =>
                    setCommentData({ content: event.target.value })
                  }
                ></textarea>
                <button
                  className="btn  mt-3 mb-3 "
                  style={{ backgroundColor: "black", color: "white" }}
                  onClick={postcommentHandler}
                  disabled={!isLogin() ? true : false}
                >
                  {!isLogin() ? "Login to submit" : "Submit"}
                </button>
              </div>
            )}

            {postcontent?.comments && doComment && (
              <div className="container">
                {postcontent.comments.slice(0).reverse().map((comment, index) => {
                  return <Comments key={index} commentinfo={comment} />;
                })}

                <button
                  className="btn  mt-3 mx-auto d-block mb-4"
                  style={{ backgroundColor: "black", color: "white" }}
                  onClick={topHandler}
                >
                  <i className="fa-solid fa-angles-up"></i>Back to Top
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
