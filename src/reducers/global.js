/**
 * Created by wxq on 2017/8/23.
 */
import {actionType } from '../action/global'

module.exports =  function HomeObj(state = {
    isLogin:false,
    user:{},
    list:[]
}, action) {
    switch (action.type) {
        case actionType.ADD_LIST:
            console.log(action.obj)
            let arr = state.list||[]
            state.list = [...arr,action.obj]
            return {...state}
        case actionType.USER:
            state.user = action.user
            state.isLogin = true
            return {...state}
        case actionType.LOGIN_OUT:
            state.isLogin = false
            state.user = {}
            return {...state}
        default:
            return state
    }
}