/**
 * Created by wxq on 2017/6/28.
 */
import React from 'react';
import {PropTypes} from 'prop-types';
import util from '../../utils/myMomen'
import DownAlert from '../downAlert/downAlert'
import defImg from '../../image/def.png'
import { connect } from 'react-redux'
import {LoginOut} from '../../action/user'
import Request from 'components/Request/request'
class Logined extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: util.getCookie('token'),
            systemMsgCount:0,
            showDownAlert:false
        }
        //处理绑定方法
        var bind = [

        ]
        bind.forEach(func=>{
            this[func] = this[func].bind(this);
        })
    }
    componentDidMount() {
        this.getSystemMsg()
    }
    getSystemMsg(token){
        this.props.axios({
            data:JSON.stringify({
                query: `{messages(token:"${this.props.getCookie('token')}"){uid,url,message,createdDate}}`
            })
            },res=>{
                var messages = res.data.messages.length;
                this.setState({
                    systemMsgCount: messages,
                })
            })

    }
    getRecharge=(type)=>{
        if(type == 'close'){
            this.setState({'showDownAlert':false})
        }else {
            this.setState({'showDownAlert':true})
        }
    }
    quitLogin=()=>{
        util.setCookie('token','');
        this.props.dispatch(LoginOut())
    }
    render(){
        let user = this.props.user
        return (
            <div>
                <div className="login-ed">
                    <div className="qiutBtn" onClick={()=>{this.quitLogin()}}></div>
                    <div className="setBtn" onClick={()=>{this.getRecharge()}}></div>
                    <div className="avatar">
                        <img src={user.user.avatar||defImg} alt=""/>
                    </div>
                     <div className="name">{user.user.name}</div>
                    <div className="myMoney">
                        <div className="gold">
                            <div className="icon"></div>
                            <div className="count">{user.account.gold}</div>
                            <a href="exchangeGold.html"><div className="btn">兑换</div></a>
                        </div>
                        <div className="zuanshi">
                            <div className="icon"></div>
                            <div className="count">{user.account.diamonds}</div>
                            <a href="recharge.html"><div className="btn">购买</div></a>
                        </div>
                        <div className="jifen">
                            <div className="icon"></div>
                            <div className="count">{user.account.credit}</div>
                            <div className="btn" onClick={this.getRecharge}>获取</div>
                        </div>
                    </div>
                    <div className="home">
                        <div className="icon"></div>
                        <a href="app.html"><div className="text">首页</div></a>
                    </div>
                    <div className="history">
                        <div className="icon"></div>
                        <a href="history.html"><div className="text">竞猜历史</div></a>
                    </div>
                    <div className="change">
                        <div className="icon"></div>
                        <a href="shop.html"><div className="text">奖品兑换</div></a>
                    </div>
                    <div className="msg">
                        <div className="icon"></div>
                        <a href="systemList.html"><div className="text">系统消息（ {this.state.systemMsgCount} ）</div></a>
                    </div>
                    <DownAlert closeFn={this.getRecharge} show={this.state.showDownAlert}/>
                </div>
            </div>
        )
    }

}

Logined.PropTypes = {
    user:PropTypes.Object
}
function user(state) {
    return {
        user:state.user
    }
}
export default connect(user)(Request(Logined));