import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import img from '../avatarImage.jpg'
import { getCommentbyuserid, getLikescountbyuserid } from '../service/Comment-service';
import { getPostsbyuser } from '../service/Post-service';



export default function MyFeeds(userDetail) {
  console.log('userdetail');
  
  console.log(userDetail);
  const [userPost, setUserPost] = useState({});
  const [userComment, setUserComment] = useState(0);
  const [userLike, setUserLike] = useState(0);

  useEffect(() => {
    getPostsbyuser(0,userDetail.userDetail.id).then((postsdata)=>{
        console.log(postsdata)
        setUserPost({
            contents: postsdata.content,
            pageNumber: postsdata.pageNumber,
            totalElements: postsdata.totalElements,
            currentElements: postsdata.content.length,
        })
    }).catch((error)=>{
        console.log(error);
    });

    getCommentbyuserid(userDetail.userDetail.id).then((data)=>{
        console.log(data);
        setUserComment(data.length)
    }).catch((error)=>{
        console.log(error)
    });

    getLikescountbyuserid(userDetail.userDetail.id).then((data)=>{
        setUserLike(data)
    }).catch((error)=>{
        console.log(error)
    });
  
  }, [userDetail])
  
  
  
    return (
        <>
        {userDetail.userDetail && userPost  &&
    <div className='mt-4 mb-4 card shadow' >
        <h4 className="card-title mt-2 text-center ">
            My Profile
        </h4>
         
        <div className="container ">
            <div className="row">
                <div className="col-3 text-center" >
                    <img src={img} alt="" className='mt-1 mb-1' style={{width:"150px",height:"150px"}} />
                    <br /> 
                    <h4>{userDetail.userDetail.name}</h4>
                </div>
                <div className="col-9" >
                    <div className="card-body">
                        <h6 className="card-title mb" style={{fontWeight:"bold"}}>About me : 
                        <span className="card-text" style={{fontWeight:"lighter"}}>{userDetail.userDetail.about}</span></h6>
                        <h6 className="card-title mb-0" style={{fontWeight:"bold"}}>Email : 
                        <span className="card-text" style={{fontWeight:"lighter"}}>{userDetail.userDetail.email}</span></h6>
                        <div class="container text-center mt-4 mb-1 shadow" style={{border:"2px solid grey"}}>
                        <div class="row justify-content-md-center">
                            <div class="col col-lg-2 mt-2 " style={{fontWeight:"bold"}} >
                                My Activity
                            </div>
                        </div>
                        <div class="row counter" >
                            <div className="col" >
                            <h4 className='mt-2 mb-0'>{userPost.totalElements}</h4>
                            <p className='mt-0 mb-1' style={{fontWeight:"bold",fontSize:"14px"}}>Posts</p>
                            </div>
                            <div className="col" >
                            <h4 className='mt-2 mb-0'>{userComment}</h4>
                            <p className='mt-0 mb-1' style={{fontWeight:"bold",fontSize:"14px"}} >Comments</p>
                            </div>
                            <div className="col" >
                            <h4 className='mt-2 mb-0'>{userLike}</h4>
                            <p className='mt-0 mb-1' style={{fontWeight:"bold",fontSize:"14px"}}>Likes</p>
                            </div>
                            
                        </div>
                        </div>
                        
                    </div> 
                </div>
            </div>
            </div>
        
    </div>
}
    </>
  )
}

