const INITIAL_STATE = {
    id: null,
    date: "",
    name: "",
    serial: null,
    stock: null,
    category: "",
    price: null,
    status: ""
}


  
// const INITIAL_STATE = {
//     products_list: [],
//     products_sort: []
// }

export const productReducers = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "GET_PRODUCT":
            console.log("reducer", action.payload)
            return { ...state,...action.payload }
        default:
            return state
    }
}