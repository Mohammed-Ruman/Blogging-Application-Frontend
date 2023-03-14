import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {  getPostsbyuser } from "../service/Post-service";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import Postuser from "./Postuser";
import { deletePostbyId } from "../service/Post-service";


export default function MyFeeds(userDetail) {
    console.log(userDetail);
    const [posts, setPosts] = useState({});

  useEffect(() => {
    loaduserbyid()
  }
    , []);

  function loaduserbyid(){
    getPostsbyuser(0,userDetail.userDetail.id)
    .then((postsdata) => {
      console.log(postsdata);
      setPosts({
        contents: postsdata.content,
        pageNumber: postsdata.pageNumber,
        totalElements: postsdata.totalElements,
        currentElements: postsdata.content.length,
      });
    })
    .catch((errors) => {
      console.log(errors)
      toast.error("Server error");
    });

  }

  const fetchMoreData = () => {
    setTimeout(() => {
      getPostsbyuser(posts.pageNumber + 1,userDetail.userDetail.id)
        .then((postsdata) => {
          setPosts({
            contents: posts.contents.concat(postsdata.content),
            pageNumber: postsdata.pageNumber,
            totalElements: postsdata.totalElements,
            currentElements: posts.currentElements + postsdata.content?.length,
          });
        })
        .catch((errors) => {
          console.log(errors);
          toast.error("Server error");
        });
    }, 2000);
  };
  const topHandler = () => {
    window.scrollTo(0, 0);
  };
  
  function postdeleteHandler(postinfo){
    console.log("delete button hit");
    if(postinfo.user.id!==userDetail.userDetail.id){
        toast.error("Unable to delete as it is someone else post");
        return
    }

    deletePostbyId(postinfo.postId).then((data)=>{
        toast.success("Post deleted successfully!!!");
        loaduserbyid();
    }).catch((error)=>{
        console.log(error);
    })
}

  return (
    <>
        {userDetail && posts &&
        <InfiniteScroll
        dataLength={posts.contents?.length == null ? 0 : posts.contents.length}
        next={fetchMoreData}
        hasMore={posts.currentElements !== posts.totalElements}
        loader={<Spinner />}
      >
        <div className="container mt-3">
          <h2 className="mx-auto text-center mt-3 mb-3">{userDetail.userDetail.name} posts</h2>
          <div className="row row-cols-1 row-cols-md-2 g-4">
            {posts.contents?.map((post) => {
              return <Postuser key={post.postId} postinfo={post} user={userDetail} deletePost={postdeleteHandler} />;
            })}
          </div>
        </div>
        {posts.currentElements === posts.totalElements && (
          <div className="text-center">
            {" "}
            <button
              className="btn text-center mt-3 mb-3"
              style={{ backgroundColor: "black", color: "white" }}
              onClick={topHandler}
            ><i className="fa-solid fa-angles-up"></i>
              Back to Top
            </button>
          </div>
        )}
      </InfiniteScroll>
        }
    </>
  )
}
