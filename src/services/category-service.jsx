import { myAxios } from "./helper"

export const getAllCategories=()=>{
    return myAxios.get('/category/').then(response => response.data)
}