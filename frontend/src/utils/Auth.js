export const isLogin=()=>{
    const login=localStorage.getItem('login')
    return login;
}

export const isUserAdmin=()=>{
    const data=JSON.parse(localStorage.getItem('data'))
    return data?.isAdmin|| false;
}

export const getUserData=()=>{
    return JSON.parse(localStorage.getItem("data"));
}