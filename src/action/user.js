
export const actionType = {
    USER: 'USER',
    LOGIN_OUT: 'LOGIN_OUT',
    ACCOUNT:'ACCOUNT',
    SETPHONE:'SETPHONE'
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

export function setAccount(account) {
    return { type: actionType.ACCOUNT,account}
}
export function setPhone(phone) {
    return { type: actionType.SETPHONE,phone}
}
