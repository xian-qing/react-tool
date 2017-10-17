/**
 * Created by wxq on 2017/9/5.
 */
/**
 * Created by wxq on 2017/9/5.
 */
import React from 'react';
import {PropTypes} from 'prop-types';
import Request from 'components/Request/request'
import { createBrowserHistory } from 'history';
//redux
import { connect } from 'react-redux'
import { saveUser,setAccount, LoginOut} from '../../action/user'
class Home extends React.Component {
    componentDidMount() {
        this.getCodeLogin()
    }
    getCodeLogin(){
        let me = this;
        let params;
        if(this.props.getArgs('state') == 'QQ'){
            params = JSON.stringify({
                query:'mutation {' +
                'loginWithQQCode:loginWithQQCode(code:"'+ this.props.getArgs('code')+'",' +
                'redirectUri:"'+ `http://${window.location.host}/login.html?url=`+encodeURIComponent(this.props.getArgs('url')) +'"){' +
                'status,' +
                'msg,' +
                'user {token,name,avatar,id,uid}'+
                '}}'
            });
        }
        if(this.props.getArgs('state') == 'WX'){
            params = JSON.stringify({
                query:'mutation {' +
                'loginWithWeiXinCode:loginWithWeiXinCode(code:"'+ this.props.getArgs('code')+'"){' +
                'status,' +
                'msg,' +
                'user {token,name,avatar,id,uid}'+
                '}}'
            });
        }
        if(this.props.getArgs('pc_id')){
            params = JSON.stringify({
                query:'mutation {' +
                'loginWithWeiXinCode:loginWithWeiXinCode(code:"'+ this.props.getArgs('code')+'",uuid:"'+ this.props.getArgs('pc_id') +'"){' +
                'status,' +
                'msg,' +
                'user {token,name,avatar,id,uid}'+
                '}}'
            });
        }
        this.props.axios({
            data:params
        },res=>{
            let resObj;
            if(this.props.getArgs('state') == 'QQ'){
                resObj = res.data.loginWithQQCode;

            }else {
                resObj = res.data.loginWithWeiXinCode
            }
            if(resObj.status == 0){
                createBrowserHistory().push('/');
                if(resObj.user){
                    this.props.setCookie('token',resObj.user.token);
                    window.location.href  = this.props.getArgs('url')
                }
            }
        })


    }
    render(){
        return (
            <div className="" style={{'textAlign':'center'}} >
                正在登录中
            </div>
        )
    }
}

export default connect()(Request(Home))