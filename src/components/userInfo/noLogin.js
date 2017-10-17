/**
 * Created by wxq on 2017/6/28.
 */
import React from 'react';
import util from '../../utils/myMomen'
class NoLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phone:'',
            code:'',
            getCodeBtn:'获取验证码',
            setIntervalTimer:0,
            msg:''
        }
        //处理绑定方法
        var bind = [
            'phoneInput',
            'codeInput',
            'getCode',
            'login','focusInput'
        ]
        bind.forEach(func=>{
            this[func] = this[func].bind(this);
        })
    }
    componentDidMount() {
    }
    phoneInput(e){
        var phone = e.target.value;
        if(phone.length<=11){
            this.setState({'phone':phone})
        }

    }
    codeInput(e){
        var code = e.target.value;
        this.setState({'code':code})
    }
    getCode(){
        var that = this;
        if(this.state.phone.length != 11){
            that.setState({msg:'请输入正确的手机号'});
            return
        }else if(this.state.getCodeBtn != '获取验证码'){
            that.setState({msg:'请稍后再试'});
            return
        }
        if(this.state.phone.length == 11&&this.state.getCodeBtn == '获取验证码'){
            that.setBtnTime()
            var params = JSON.stringify({
                query:'mutation {checkCode:checkCode( phone:"'+this.state.phone+'"){status msg}}'
            });
            util.graphQlFn({params:params},res=>{
               if(res.data.checkCode.status==0){
               }
            })
        }
    }
    setBtnTime(){
        console.log(1);
        var that = this;
        that.state.setIntervalTimer = setInterval(function () {
            if(that.state.getCodeBtn == '获取验证码'){
                //that.state.getCodeBtn = 59
                that.setState({'getCodeBtn':'59S'});
            }else {
                that.state.getCodeBtn = parseInt(that.state.getCodeBtn) - 1;
                that.setState({'getCodeBtn':that.state.getCodeBtn+'S'});
                if(parseInt(that.state.getCodeBtn) < 1){
                    that.setState({'getCodeBtn':'获取验证码'});
                    clearInterval(that.state.setIntervalTimer)
                }

            }
        },1000)
    }
    login(){
        var that = this;
        if(this.state.phone.length == 11&&this.state.code){
            var params = JSON.stringify({
                query:'mutation{login:login(phone:"'+this.state.phone+'",code:"'+ this.state.code +'"){status,msg,user{id,name,uid,token,avatar}}}'
            });
            util.graphQlFn({params:params},res=>{
                console.log(12);
                if(res.data.login.status==0){
                    that.setState({'msg':''});
                    that.props.success(res.data.login.user);
                    util.setCookie('phone',this.state.phone)
                }else {
                    //登录失败
                    that.setState({'msg':res.data.login.msg});
                }
            })
        }else if(this.state.phone.length != 11){
            that.setState({'msg':'请输入正确的手机号'});
        }else if(!this.state.code){
            that.setState({'msg':'请输入验证码'});
        }
    }
    QQLogin(){
        let redirect = encodeURIComponent('http://m.wxqing.cn/login.html?url='+encodeURIComponent(window.location.href));
        window.location.href = 'https://graph.qq.shareApp/oauth2.0/authorize?client_id=101413406&redirect_uri=' + redirect + '&response_type=code&state=QQ&scope=get_user_info#qq_redirect';
    }
    WXLogin(){
        let redirect = encodeURIComponent('http://m.wxqing.cn/login.html?url='+encodeURIComponent(window.location.href));
        location.href = 'https://open.weixin.qq.shareApp/connect/oauth2/authorize?appid=wxb9189778eef0d1e6&redirect_uri='+ redirect +'&response_type=code&scope=snsapi_userinfo&state=WX#wechat_redirect'
    }
    focusInput(){
        this.setState({'msg':''});
    }
    render(){
        let isWx = util.getBrowserType() == 'wx'?true:false
        return (
            <div>
                <div className="no-login">
                    <div className="phone-input">
                        <input type="number" value={this.state.phone} onChange={this.phoneInput} onFocus={this.focusInput}  placeholder="请输入手机号"/>
                    </div>
                    <div className="code">
                        <input type="number"  value={this.state.code} onChange={this.codeInput} onFocus={this.focusInput} placeholder="请输入验证码"/>
                        <div className={"code-btn " + (this.state.getCodeBtn !='获取验证码'?'code-btn-ing':'')} onClick={this.getCode}>{this.state.getCodeBtn}</div>
                    </div>
                    <div className="error-msg">{this.state.msg}</div>
                    <div className="login-btn" onClick={this.login}>
                        登录
                    </div>
                    {/*第三方登录*/}
                    <div className="login-other">
                        <div className="division"></div>
                        <div className={"btn " + (isWx?'':'isNotWx')}>
                            <div className="btn-qq" onClick={this.QQLogin}></div>
                            <div className="btn-wx" onClick={this.WXLogin}></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
export default NoLogin;