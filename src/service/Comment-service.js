import { myAxious, privateAxious } from "./helper"

export const postComment=(commentData)=>{
    return privateAxious.post(`/api/user/${commentData.userId}/post/${commentData.postId}/comment`,commentData).then(response=>response.data);
}

//to check is post is liked or not
export const isLiked=(userId,postId)=>{
    return myAxious.get(`/api/user/${userId}/post/${postId}/like`).then(response=>response.data);
}

//to add like

export const postLike=(userId,postId)=>{
    return privateAxious.post(`/api/user/${userId}/post/${postId}/like`).then(response=>response.data);
}

//get comment by userid
export const getCommentbyuserid=(userId)=>{
    return myAxious.get(`/api/comment/${userId}`).then(response=>response.data)
}

//get likescount by userId
export const getLikescountbyuserid=(userId)=>{
    return myAxious.get(`/api/user/${userId}/like`).then(response=>response.data);
}