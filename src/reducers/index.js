import { combineReducers } from 'redux'
import todo  from './home'
import global  from './global'
import user from './user'
const todoApp = combineReducers({
    todo:todo,
    global:global,
    user:user
})

export default todoApp