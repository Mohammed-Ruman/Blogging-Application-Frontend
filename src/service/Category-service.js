import { myAxious } from "./helper"

export const getcategories=()=>{
    return myAxious.get("/api/categories/").then((response)=>response.data);
}

