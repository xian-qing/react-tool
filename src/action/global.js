
export const actionType = {
    USER: 'USER',
    LOGIN_OUT: 'LOGIN_OUT',
    ADD_LIST:'ADD_LIST'
}


/*
 * 其它的常量
 */

/*
 * action 创建函数
 */

export function saveUser(user) {
    return { type: actionType.USER, user }
}

export function LoginOut() {
    return { type: actionType.LOGIN_OUT}
}

export function addList(obj) {
    return { type: actionType.ADD_LIST, obj}
}
