import React from 'react'
import { useState } from 'react';
import { getUserdetails } from '../Auth'
import Addpost from '../components/Addpost';
import MyFeeds from '../components/MyFeeds';
import Profilecard from '../components/Profilecard'

export default function Userdashboard() {
  const userdetails=getUserdetails();
  const name=userdetails.name.charAt(0).toUpperCase()+userdetails.name.substring(1);
  
  const [addNew, setAddNew] = useState(false);
  const [showpost, setShowpost] = useState(false);

  const addnewHandler=()=>{
    setShowpost(false);
    setAddNew(true);
    console.log(showpost);
    console.log(addNew);
  }
  const viewpostHandler=()=>{
    setShowpost(true);
    setAddNew(false);
    console.log(showpost);
    console.log(addNew);
  }
  
  return (
    <>
    
    <div className="container my-3"  >
    {userdetails &&    <Profilecard userDetail={userdetails} />}
    
    
    <div className="container text-center mt-3 mb-2">
        <div className="row justify-content-md-center">
          <div className="col col-lg-2">
            <button className="btn" style={{ backgroundColor: "black", color: "white" }}
            onClick={addnewHandler}
            ><i className="fa-solid fa-plus"></i>Add new post</button>
            
          </div>
          <div className="col-md-auto mt-2" style={{fontSize:"16px",fontWeight:"bold"}}>
          <i class="fa-solid fa-angles-left fa-fade fa-lg m-1"></i>{`Choose   `}<i class="fa-solid fa-angles-right fa-fade fa-lg"></i>
          </div>
          <div className="col col-lg-2">
          <button className="btn" style={{ backgroundColor: "black", color: "white" }}
          onClick={viewpostHandler}><i className="fa-solid fa-eye"></i>View my post</button>
          </div>
        </div>
    </div>
    {showpost && <MyFeeds userDetail={userdetails} />}
    { addNew &&
      <div className='mt-3'>
        <div className='conatiner d-flex align-items-center justify-content-center' style={{marginTop:"10px"}}>
          <h3>{`${name} what's in your mind?`}</h3> 
        </div>
        <div className='conatiner d-flex align-items-center justify-content-center my-0'>
          <p>Feel free to write article or blog to share your knowledge or experience which will be beneficial for others.</p>
        </div>
      </div>
    }
    
    </div>
      {addNew && <Addpost />}
    </>
  )
};
