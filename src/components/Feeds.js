import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getPost } from "../service/Post-service";
import Post from "./Post";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import Categorynavbar from "./Categorynavbar";

export default function Feeds() {
  const [posts, setPosts] = useState({});

  useEffect(() => {
    getPost()
      .then((postsdata) => {
        setPosts({
          contents: postsdata.content,
          pageNumber: postsdata.pageNumber,
          totalElements: postsdata.totalElements,
          currentElements: postsdata.content.length,
        });
      })
      .catch((errors) => {
        toast.error("Server error");
      });
  }, []);

  const fetchMoreData = () => {
    setTimeout(() => {
      getPost(posts.pageNumber + 1)
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
      <InfiniteScroll
        dataLength={posts.contents?.length == null ? 0 : posts.contents.length}
        next={fetchMoreData}
        hasMore={posts.currentElements !== posts.totalElements}
        loader={<Spinner />}
      >
        <div className="container mt-3">
          <h2 className="mx-auto text-center mt-3 mb-3">New posts</h2>
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
      </InfiniteScroll>
    </>
  );
}
