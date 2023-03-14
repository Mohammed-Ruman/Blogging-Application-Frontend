import { myAxious } from "./helper"

export const signUp = (user) => {
    return myAxious.post("/api/auth/register",user).then((response)=>response.data);    
}


export const logIn =(loginDetail)=>{
    return myAxious.post("/api/auth/login",loginDetail).then((response)=>response.data);
}