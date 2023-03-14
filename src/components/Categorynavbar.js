import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { getcategories } from '../service/Category-service';


export default function Categorynavbar() {

    const [categorydetails, setCategorydetails] = useState();
    useEffect(() => {
      getcategories().then(data=>{
        console.log(data);
        setCategorydetails(data);
        console.log(categorydetails.length );

      }).catch(error=>console.log(error))
    }, []);
    

    const leftclickHandler=()=>{
       const left=document.querySelector(".rum1");
       left.scrollBy(-200,0);
    }

    const rightclickHandler=()=>{
        const right=document.querySelector(".rum1");
        right.scrollBy(200,0);
     }
    


  return (
    <>
    <div className="d-flex justify-content-between mt-1" style={{height:"30px",marginBottom:"10px"}}>
        <div className="">
            <button className="btn  " onClick={leftclickHandler}>
                <i className="fa-solid fa-angles-left fa-fade"
                ></i>
            </button> 
        </div>
        <div  style={{overflow:"hidden",marginTop:"8px"}}>
        <div className="rum1 d-flex" style={{marginBottom:"-80px",paddingBottom:"80px",width:"100%",flexWrap:"nowrap",overflowX:"scroll",overflowY:"hidden",scrollBehavior:"smooth"}}>
            {
                
                categorydetails && categorydetails.map((category)=>{
                    
                    return <Link to={"/category/"+category.categoryId} key={category.categoryId}
                    style={{width:"100%",marginLeft:"25px",display:"inline-block",objectFit:"cover",whiteSpace:"nowrap",textDecoration:"none",color:"#226597"}}>{category.categoryTitle}</Link>
                })
            }
        </div>
        </div>
        <div className="">
            <button className="btn" onClick={rightclickHandler}>
                <i className="fa-solid fa-angles-right fa-fade"></i>
             </button>
        </div>
    </div>
    </>
  )
}
