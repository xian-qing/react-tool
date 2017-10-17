/**
 * Created by stone on 2017/6/19.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { saveUser,addList} from '../../action/global'
import {Link,withRouter} from 'react-router-dom'
import './index.scss'
import Request from 'components/Request/request'
//import Title from 'components/title/title'
import User from 'components/user/user'
import utils from 'utils/myMomen'
import ScrollDiv from 'components/scrollDiv/scrollDiv'
class App extends React.Component {
    constructor(props) {
        super(props);

    }
    componentWillMount() {
        window.document.body.style.opacity =0
    }
    componentDidMount() {
        window.document.body.style.opacity =1
    }
    getUser(){
        if(!this.props.global.isLogin&&utils.getCookie('token')){
            this.props.axios({
                data:JSON.stringify({
                    query:`{
                        user(
                          token:"${utils.getCookie('token')}" #用户自己的token
                        ){
                        name								#用户名
                        avatar							#头像地址
                      }
                    }`
                })},res=>{
                this.props.dispatch(saveUser({name:res.data.user.name,age:18}))
            })

        }
    }
    getConfirm(msg){
        console.log(msg)
    }
    scrollBottom=(callback)=>{
        console.log(123)
        callback(2)
    }
    onRefresh=(callback)=>{
        setTimeout(()=>{
            console.log(3)
            callback()
        },1000)
    }
    render(){
        let global = this.props.global
        let list = []
        global.list.forEach((v,i)=>{
            list.push(
                <div key={i}>
                    {v.list}
                </div>
            )
        })
        return (
            <div id="Home">
                <User info=""/>
                <ScrollDiv height="12rem" width="10rem" onScrollBottom={this.scrollBottom} onRefresh={this.onRefresh}>
                   {/*<div>添加列表</div>
                   <div onClick={()=>{this.props.alert('弹窗糕时光机')}}>弹窗</div>
                   <div onClick={()=>{this.props.confirm('弹窗糕时光机')}}>弹窗确认框</div>
                   <div onClick={()=>{this.props.dispatch(saveUser({name:'wxq',age:18}))}}>登录</div>
                   <div onClick={()=>{this.props.dispatch(addList({list:1}))}}>添加列表</div>*/}
                    <Link to="/share"> 去分享页面</Link>
                    <div className="lll">
                        <div>
                            <input type="file" />
                        </div>
                        <div>123</div>
                        <div>123</div>
                        <div>123</div>
                        <div>123</div>
                        <div>123</div>
                        <div>123</div>
                        <div>123</div>
                        <div>123</div>
                        <div>123</div>
                        <div>123</div>
                        <div>123</div>
                        <div>123</div>
                        <div>123</div>
                        <div>123</div>
                        <div>123</div>
                        <div>123</div>
                        <div>123</div>
                        <div>123</div>
                        <div>123</div>
                        <div>123</div>
                        <div>123</div>
                        <div>123</div>
                        <div>123</div>
                    </div>
                </ScrollDiv>
            </div>
        )
    }
}
App.PropTypes = {
    global:PropTypes.Object
}
App.defaultProps = {
    global:{
        user:{},
        list:[]
    }
}

const mapStateToProps = (state) => {
    return {
        global:state.global
    }
}
const mapDispatchToProps = (dispatch, ownProps) =>{
    return {}
}
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Request(App)));