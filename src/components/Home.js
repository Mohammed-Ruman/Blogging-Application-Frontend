import React from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getPost, getPostbyKeyword } from "../service/Post-service";
import { BASE_URL } from "../service/helper";
import { Link } from "react-router-dom";
import Post from "./Post";


export default function Home() {
  const [posts, setPosts] = useState({});
  const [keyword, setKeyword] = useState();
  const [keywordPosts, setKeywordPosts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [noResult,setNoResult]=useState(false);


  const topHandler = () => {
    window.scrollTo(0, 0);
  };

  const changeHandler=(event)=>{
    setKeyword(event.target.value);
  }

  const submitHandler=(event)=>{
    event.preventDefault();
    if(keyword.trim().length===0){
      toast.error("Enter keyword to search");
      return;
    }
    console.log(keyword);
    getPostbyKeyword(keyword).then((data)=>{
      console.log(data)
      if(data.length>0){
      setKeywordPosts(data);
      setKeyword("");
      setShowResult(true);
      setNoResult(false);
    }
      else{
        setShowResult(false);
        setNoResult(true);
      }
      console.log(keywordPosts)
    }).catch((error)=>{
      console.log(error)
    })
  }

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
        console.log(errors)
      });
  }, []);
  console.log(posts);

  return (
    <>
    { posts.contents && 
      
      
    
    <div className=" text-center mt-2 p-1" style={{backgroundColor:"#ffd55a"}}>
      <h1 style={{fontFamily:'Bungee Spice'}} ><u>Welcome to Readr</u></h1> 
      <div id="carouselExampleIndicators" className="carousel  slide mt-2 mb-2" data-ride="carousel">
        {/* <h3 className="text-center mt-1"><u>Trending Post</u></h3> */}
        <ol className="carousel-indicators">
          <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="4"></li>
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active" >
            <img className="d-block w-100" src={BASE_URL + "/api/post/image/" + posts.contents[0].imageName} alt="First slide" style={{maxHeight:"500px",objectFit:"cover"}} />
            <div className="carousel-caption d-none d-md-block">
              <h5 style={{fontSize:"50px",fontWeight:"bold"}}>{posts.contents[0].title}</h5>
              <p style={{fontSize:"25px"}}>{posts.contents[0].content
                .toString()
                .replace(/(<([^>]+)>)/gi, "")
                .substring(0, 150)}
              ....</p>
              <Link
                to={"/post/" + posts.contents[0].postId}
                className="btn  btn-xl"
                style={{
                  backgroundColor: "black",
                  color: "white",
                  borderRadius: "50px"
                  
                }}>Read more </Link>
            </div>
          </div>
          <div className="carousel-item">
          <img className="d-block w-100" src={BASE_URL + "/api/post/image/" + posts.contents[1].imageName} alt="First slide" style={{maxHeight:"500px",objectFit:"cover"}} />
            <div className="carousel-caption d-none d-md-block">
              <h5 style={{fontSize:"50px",fontWeight:"bold"}}>{posts.contents[1].title}</h5>
              <p style={{fontSize:"25px"}}>{posts.contents[1].content
                .toString()
                .replace(/(<([^>]+)>)/gi, "")
                .substring(0, 150)}
              ....</p>
              <Link
                to={"/post/" + posts.contents[1].postId}
                className="btn  btn-xl"
                style={{
                  backgroundColor: "black",
                  color: "white",
                  borderRadius: "50px"
                  
                }}>Read more </Link>
            </div>
          </div>
          <div className="carousel-item">
          <img className="d-block w-100" src={BASE_URL + "/api/post/image/" + posts.contents[2].imageName} alt="First slide" style={{maxHeight:"500px",objectFit:"cover"}} />
            <div className="carousel-caption d-none d-md-block">
              <h5 style={{fontSize:"50px",fontWeight:"bold"}}>{posts.contents[2].title}</h5>
              <p style={{fontSize:"25px"}}>{posts.contents[2].content
                .toString()
                .replace(/(<([^>]+)>)/gi, "")
                .substring(0, 150)}
              ....</p>
              <Link
                to={"/post/" + posts.contents[2].postId}
                className="btn  btn-xl"
                style={{
                  backgroundColor: "black",
                  color: "white",
                  borderRadius: "50px"
                  
                }}>Read more </Link>
            </div>
          </div>
          <div className="carousel-item">
          <img className="d-block w-100" src={BASE_URL + "/api/post/image/" + posts.contents[3].imageName} alt="First slide" style={{maxHeight:"500px",objectFit:"cover"}} />
            <div className="carousel-caption d-none d-md-block">
              <h5 style={{fontSize:"50px",fontWeight:"bold"}}>{posts.contents[3].title}</h5>
              <p style={{fontSize:"25px"}}>{posts.contents[3].content
                .toString()
                .replace(/(<([^>]+)>)/gi, "")
                .substring(0, 150)}
              ....</p>
              <Link
                to={"/post/" + posts.contents[3].postId}
                className="btn  btn-xl"
                style={{
                  backgroundColor: "black",
                  color: "white",
                  borderRadius: "50px"
                  
                }}>Read more </Link>
            </div>
          </div>
          <div className="carousel-item">
          <img className="d-block w-100" src={BASE_URL + "/api/post/image/" + posts.contents[4].imageName} alt="First slide" style={{maxHeight:"500px",objectFit:"cover"}} />
            <div className="carousel-caption d-none d-md-block">
              <h5 style={{fontSize:"50px",fontWeight:"bold"}}>{posts.contents[4].title}</h5>
              <p style={{fontSize:"25px"}}>{posts.contents[4].content
                .toString()
                .replace(/(<([^>]+)>)/gi, "")
                .substring(0, 150)}
              ....</p>
              <Link
                to={"/post/" + posts.contents[4].postId}
                className="btn  btn-xl"
                style={{
                  backgroundColor: "black",
                  color: "white",
                  borderRadius: "50px"
                  
                }}>Read more </Link>
            </div>
          </div>
        </div>
        <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
      </div>

      <label style={{fontFamily: 'Rubik Dirt',fontSize:"26px"}}>Type keywords below to search article </label>
      <form className="form-inline  mt-0" onSubmit={submitHandler}>
        <input className="form-control mr-sm-2 mx-auto text-center mb-1 " type="search" placeholder="Keyword" aria-label="Search" 
        onChange={changeHandler} value={keyword}
        style={{width:"50%"}}/>
        <button className="btn my-2 my-sm-0" type="submit"
        style={{backgroundColor:"green",color:"white",width:"100px"}}
        >Search</button>
      </form>

    </div>
  }
  {
    showResult && <div className="container  card shadow  mt-2">
        <div className="row row-cols-1 row-cols-md-2 g-4 mt-2">
            {keywordPosts.map((post) => {
              return <Post key={post.postId} postinfo={post} />;
            })}
          </div>
          <p className="text-center">Kindly login to like and comment on post</p>
      </div>
  }
  {
    noResult && <div className="container card shadow text-center mt-2">
      <h2>Oops:No result found</h2>
      <p>Switch to feeds tab to explore other posts</p>
    </div>
  }
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
  
  </>
  );
}
