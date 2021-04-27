import {authReducer} from './authReducer'
import {combineReducers} from 'redux'
import {productReducers} from './productReducers'

export default combineReducers({
    authReducer,
    productReducers
})