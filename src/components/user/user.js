/**
 * Created by stone on 2017/6/18.
 */
import React,{ Component }  from 'react';
import {PropTypes} from 'prop-types';
import util from '../../utils/myMomen'
import './index.scss';
import logo from 'img/logo.png'
import defImg from 'img/def.png'
import downLoadBtn from 'img/download.png'
import NoLogin from './noLogin'
import Logined from './logined'
import NoPhone from './noPhone'
import { Link } from 'react-router-dom';
import Request from 'components/Request/request'

//redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { saveUser,setAccount, LoginOut} from '../../action/user'
class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginShow:false
        };
    }
    componentDidMount() {
        this.getUserInfo();
        //util.cnzzFn()
    }
    componentWillReceiveProps(nextProps){

    }
    isWxToDo(){
        if(util.getBrowserType() == 'wx'){
            console.log('wx')
            let h = window.location.href;
            if(h.indexOf('shopCar.html')!=-1){
                return
            }

            let head= document.getElementsByTagName('head')[0];
            let script= document.createElement('script');
            script.type= 'text/javascript';
            script.src= 'http://res.wx.qq.shareApp/open/js/jweixin-1.2.0.js';
            head.appendChild(script);
            util.wxShare({
                shareOption:{
                    title:'电竞大亨送你红包',
                    link:'http://m.wxqing.cn/app1.html',
                    imgUrl:'http://chuantu.biz/t6/12/1503130789x2890171695.jpg',
                    desc:'互动赛事赢取豪礼，成就你的大亨梦'
                }

            })
        }
    }
    isPhone(){
        let me = this;
        if(util.getCookie('token')){
            let params = JSON.stringify({
                query: `{
                    user(
                      token:"${util.getCookie('token')}" #用户自己的token
                    ){
                    telephone
                  }
                }`
            })
            util.graphQlFn({params:params},res=>{
                let phone = res.data.user.telephone;
                if(!phone){
                    me.setState({
                        noBindPhone:true,
                        loginShow:true
                    })
                }
            })
        }


    }
    jump=(id)=>{
        var isLink = this.state.link;
        if(!isLink){
            return
        }
        console.log(this.state.link);
        window.location.href = '/gameDetail.html?id='+id
    }
    togglePage = ()=>{
        if(this.state.noBindPhone){
            return
        }
        this.setState({'loginShow':!this.state.loginShow});
        //console.log(this.state)
    }
    loginSuccess=(user)=>{
        util.setCookie('token',user.token);
        //util.setCookie('avatar',user.avatar);
        util.setCookie('uid',user.uid);
        //util.setCookie('name',user.name);
        //util.setCookie('id',user.id);
        this.setState({
            'token':user.token,
            'avatar':user.avatar,
            'uid':user.uid,
            'name':user.name,
            'id':user.id,
        })
        this.getUserInfo()
    }
    quitLogin=()=>{
        this.setState({
            'token':'',
            //'avatar':'',
            'uid':'',
            //'name':'',
            //'id':'',
            'noBindPhone':false
        })
    }
    getLocalCount(){
        //获取购物车数量
        let save;
        try {
            save = JSON.parse(window.localStorage.getItem('settlement')||'{}');
        }catch (e) {
            save = {}
        }
        let len = 0
        /*for(let i in save){
         save[i].bet.forEach((v,i)=>{
         len ++
         })
         }*/
        let token = util.getCookie('token')
        let params = JSON.stringify({
            query: `{
              myCart(
                token:"${token}"
              ) {
                match {
                  game {
                    name			#联赛名称
                  }
                }
              }
            }`
        })
        util.graphQlFn({params:params},res=>{
            console.log(res.data.myCart.length)
            this.setState({'carCount':res.data.myCart.length});
        })

    }
    getCodeLogin(){
        let me = this;
        if(!util.getCookie('token')){
            if(util.getArgs('state') == 'QQ'){
                let params = JSON.stringify({
                    query:'mutation {' +
                    'loginWithQQCode:loginWithQQCode(code:"'+ util.getArgs('code')+'"){' +
                    'status,' +
                    'msg,' +
                    'user {token,name,avatar,id,uid}'+
                    '}}'
                });
                util.graphQlFn({params:params},res=>{
                    let resObj = res.data.loginWithQQCode;
                    if(resObj.status == 0){
                        if(resObj.user){
                            let obj = {
                                token:resObj.user.token,
                                name:resObj.user.name,
                                avatar:resObj.user.avatar,
                                id:resObj.user.id,
                                uid:resObj.user.uid,
                            };
                            me.loginSuccess(obj)
                            me.setState({isCode:''});
                            //获取code 和state
                            let url = window.location.href;
                            let codeStateStr = 'code='+util.getArgs('code')+'&state='+util.getArgs('state');
                            let newUrl = url.split(codeStateStr).join('');
                            //window.location.href  = newUrl;
                        }
                    }

                })
            }
            if(util.getArgs('state') == 'WX'){
                console.log('微信登录还未开发')
            }
        }

    }
    getUserInfo = (_token)=>{
        let me = this
        //获取用户信息
        if(this.props.user.isLogin){
            return
        }
        let token = this.props.getCookie('token') || _token
        if(!token){
            return
        }

        this.props.axios({
            data:JSON.stringify({
                query:`{user(token:"${token}"){id
                    name
                    uid
                    token
                    avatar
                    telephone}}`
            })
        },res=>{

            let user =  res.data.user
            me.props.axios({
                data:JSON.stringify({
                    query:`query{
                          user(token:"${user.uid}"){
                            status
                            msg
                            userData{
                              uid
                              accounts {
                                accountID
                                uid
                                accountType
                                openTime
                                accountTotal
                              }
                            }
                          }
                        }`

                }),
                url:1
            },inRes =>{
                let result = inRes.data.user
                if(result.status == 0) {
                    let userData = result.userData;
                    let account = {}
                    userData.accounts.forEach(e => {
                        if (e.accountType == 1) {
                            account.gold = e.accountTotal
                        }
                        if (e.accountType == 2) {
                            account.credit = e.accountTotal
                        }
                        if (e.accountType == 3) {
                            account.diamonds = e.accountTotal
                        }
                    })
                    //console.log(this.props)
                    me.props.setAccount(account)
                    me.props.saveUser(user)
                }
            })
        })
    }
    bindSuccess(phone){
        this.setState({noBindPhone:false})
        this.getUserInfo()
    }
    render(){
        let user = this.props.user
        let isLogin =  <NoLogin login={this.getUserInfo}/>;
        if(user.isLogin){
            isLogin = <Logined />;
            if(!user.user.telephone){
                isLogin = <NoPhone/>;
            }
        }
        let loginShowCss = {
            transform:'translateX(-100%)'
        }
        return (
            <div className="user-info">
                <div className="user-img" onClick={this.togglePage}><span></span>
                    <img src={user.user.avatar||defImg} alt=""/>
                </div>
                <div className="user-name">
                    <div className="name">{user.user.name || '未登录'}</div>
                    <div className="gold">
                        <div className="icon"></div>
                        <div>
                            {user.account.gold}
                        </div>
                    </div>
                </div>
                <Link className="goHome"  to="/"></Link>
                <div className="detail-link">
                    <Link to="/shop">
                        <div className="shop">
                            <span></span>
                        </div>
                    </Link>

                    <Link to="/shopCart">
                        <div className="myCar">
                            <div className="car-count">
                                {this.state.carCount||0}
                            </div>
                        </div>
                    </Link>

                </div>
                <div className={'huiIN ' + (this.state.loginShow?'huiIN-show':'')}  onClick={this.togglePage}></div>
                <div  style={this.state.loginShow?{ transform:'translateX(0)'}:{ transform:'translateX(-100%)'}} className={'login-page ' + (this.state.loginShow?'login-page-show':'')}>
                    <div className="translate">
                        {isLogin}
                        <div className="download">
                            <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.jgg.games&from=singlemessage&isappinstalled=1">
                                <img className="btn" src={downLoadBtn} alt=""/>
                            </a>
                        </div>
                    </div>
                    <div className='back' onClick={this.togglePage}></div>
                </div>
            </div>
        )
    }
}
User.PropTypes = {
    user:PropTypes.Object
}
const  mapStateToProps = (state)=> {
    return {
        user:state.user
    }
}
const  mapDispatchToProps = (dispatch)=> {
    return {
        saveUser:bindActionCreators(saveUser,dispatch),
        setAccount: bindActionCreators(setAccount,dispatch),
        LoginOut: bindActionCreators(LoginOut,dispatch),
        dispatch:dispatch
    }
}
export default connect( mapStateToProps, mapDispatchToProps)(Request(User));