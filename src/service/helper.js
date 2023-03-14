import axios from "axios";
import { getToken } from "../Auth";


// export const BASE_URL="http://localhost:9090";
export const BASE_URL="http://139.59.85.3:9090";

export const myAxious=axios.create({
    baseURL:BASE_URL
});

export const privateAxious=axios.create({
    baseURL:BASE_URL
});

privateAxious.interceptors.request.use(config=>{
    const token=getToken();
    if(token){
        config.headers.common.Authorization=`Bearer ${token}`
        return config;
    }
},error=>Promise.reject(error));