import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';

export default function Comments({commentinfo}) {

  const [data, setData] = useState();

  useEffect(() => {
    setData(commentinfo)
  }, [])
  

  const date=new Date(data?.commentDate);
  const commentedon=(date.getDate()+
          "/"+(date.getMonth()+1)+
          "/"+date.getFullYear()+
          " "+date.getHours()+
          ":"+date.getMinutes()+
          ":"+date.getSeconds());


  return (
    <div className='container ' style={{display:"flex", justifyContent:"center"}}>
        
        {(data) && <div class="card shadow border-0 my-3 " style={{width:"75%"}} >
            <div class="card-body">
                <h5 class="card-title mb-0"><i className="fa-solid fa-user fa-sm"></i> <b> {data.commentUserName}</b></h5>
                <small style={{marginLeft:"30px",fontSize:"12px"}}>{commentedon} IST</small>
                <p class="card-text mt-2"style={{marginLeft:"30px",fontSize:"16px"}}>{data.content}</p>
                
                
            </div>
        </div>}
    </div>
  )
}
