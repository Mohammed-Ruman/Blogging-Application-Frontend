import { myAxious, privateAxious } from "./helper"

export const doPost=(postData)=>{
    return privateAxious.post(`/api/user/${postData.userId}/category/${postData.categoryId}/post`,postData).then(response=>response.data);
}

export const getPost=(pagenumber)=>{
    let url=''
    if(pagenumber==null){
      url="/api/post"
    }else{
        url="/api/post?pageNumber="+pagenumber;
    }
    return myAxious.get(url).then(response=> response.data);
}

export const getPostbyId=(postId)=>{
    return myAxious.get(`/api/post/${postId}`).then(response=>response.data);
}

//image uploading

export const uploadImage=(image,postId)=>{
    let formData=new FormData();
    formData.append("image",image);
    return privateAxious.post(`/api/post/image/${postId}`,formData,{
        headers:{
            'Content-Type':'multipart/form-data'
        }
    }).then(response=>response.data);
}

//Get post by category
export const getPostsbycategory=(pagenumber,categoryId)=>{
    let url=''
    if(pagenumber==null){
      url="/api/category/"+categoryId+"/post";
    }else{
        url="/api/category/"+categoryId+"/post?pageNumber="+pagenumber;
    }

    return myAxious.get(url).then(response=>response.data);
}

//get post by user
export const getPostsbyuser=(pagenumber,userId)=>{
    let url=''
    if(pagenumber==null){
      url="/api/user/"+userId+"/post";
    }else{
        url="/api/user/"+userId+"/post?pageNumber="+pagenumber;
    }
    return myAxious.get(url).then(response=>response.data);
}

//delete post by postId
export const deletePostbyId=(postId)=>{
    return privateAxious.delete(`/api/post/${postId}`).then(response=>response.data);
}

//update or edit post

export const doUpdatepost=(post,postId)=>{
    return privateAxious.put(`/api/post/${postId}`,post).then(response=>response.data);
}

//search post by keyword
export const getPostbyKeyword=(keyword)=>{
    return myAxious.get(`/api/post/search/${keyword}`).then(response=>response.data);
}