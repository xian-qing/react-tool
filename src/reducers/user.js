/**
 * Created by wxq on 2017/8/23.
 */
import {actionType } from '../action/user'

module.exports =  function HomeObj(state = {
    isLogin:false,
    user:{},
    account:{}
}, action) {
    switch (action.type) {
        case actionType.USER:
            state.user = action.user
            state.isLogin = true
            return {...state}
        case actionType.LOGIN_OUT:
            state.isLogin = false
            state.user = {}
            return {...state}
        case actionType.ACCOUNT:
            state.account = action.account
            return {...state}
        case actionType.SETPHONE:
            state.user.telephone = action.phone
            return {...state}
        default:
            return state
    }
}