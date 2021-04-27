export const authLogin=(data)=>{
    console.log("actions", data)
    localStorage.setItem("id_tkn",data.id)
    return{
        type:'LOGIN_SUCCESS',
        payload:data
    }
}

export const authLogout=()=>{
    localStorage.removeItem('id_tkn')
    return{
        type:"LOGOUT"
    }
}