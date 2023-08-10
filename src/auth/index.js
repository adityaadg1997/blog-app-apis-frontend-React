//isLoggedIn
export const isLoggedIn=()=>{
   let data = localStorage.getItem('data')
   if(data != null) return true
   else return false
}

//doLogin => set data to localstorage
export const doLogin=(data, next)=>{
    localStorage.setItem('data', JSON.stringify(data))
    next()
}

//doLogout => remove data from localstorage
export const doLogout=(next)=>{
    localStorage.removeItem('data')
    next()
}

//getCurrentUser => from localstorage
export const getCurrentUser=()=>{
    if(isLoggedIn()) return JSON.parse(localStorage.getItem('data')).user
    else return undefined

}

//get token from localstorage
export const getToken=()=>{
    if(isLoggedIn()) return JSON.parse(localStorage.getItem('data')).token
    else return undefined
}
