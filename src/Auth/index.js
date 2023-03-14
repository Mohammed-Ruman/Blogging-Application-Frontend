//isLoggedin

export const isLogin=()=>{
    if(localStorage.getItem("data")!=null){
        return true;
    }
    else{
        return false;
    }
}

//doLogin
export const doLogin= (data) =>{
  localStorage.setItem("data",JSON.stringify(data)); 
//   next();
};

//doLogout

export const doLogout=(next)=>{
    
    localStorage.removeItem("data");
    // next();
};

//get current user details

export const getUserdetails=()=>{
    if(isLogin()){
        return JSON.parse(localStorage.getItem("data")).user;
    }
    else{
        return undefined;
    }
}

export const getToken=()=>{
    if(isLogin()){
        return JSON.parse(localStorage.getItem("data")).token;
    }
    else {
        return null;
    }
}