import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getPost, getPostsbycategory } from "../service/Post-service";
import Post from "./Post";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import Categorynavbar from "./Categorynavbar";
import { useParams } from "react-router-dom";

export default function Feeds() {

    const categoryId=useParams();


  const [posts, setPosts] = useState({});

  useEffect(() => {
    getPostsbycategory(0,categoryId.categoryId)
      .then((postsdata) => {
        console.log(postsdata)
        console.log("postdata")
        setPosts({
          contents: postsdata.content,
          pageNumber: postsdata.pageNumber,
          totalElements: postsdata.totalElements,
          currentElements: postsdata.content.length,
        });
        console.log(posts.contents[0].category.categoryTitle)
      })
      .catch((errors) => {
        console.log(errors)
        if(errors.length>0){
        toast.error("Server error" );
        }
      });
  }, [categoryId]);

  const fetchMoreData = () => {
    setTimeout(() => {
      getPostsbycategory(posts.pageNumber + 1,categoryId.categoryId)
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

  return (
    <>
      <Categorynavbar />
      {posts.totalElements>0 ? 
      <InfiniteScroll
        dataLength={posts.contents?.length == null ? 0 : posts.contents.length}
        next={fetchMoreData}
        hasMore={posts.currentElements !== posts.totalElements}
        loader={<Spinner />}
      >
        <div className="container mt-3">
          <h3 className="mx-auto text-center mt-3 mb-3"> {posts.contents[0].category.categoryTitle } posts</h3>
          <div className="row row-cols-1 row-cols-md-2 g-4">
            {posts.contents?.map((post) => {
              return <Post key={post.postId} postinfo={post} />;
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
    
      </InfiniteScroll> : <h1 className="text-center">Oops : No Post available in this category</h1>
}
    </>
  );
}
