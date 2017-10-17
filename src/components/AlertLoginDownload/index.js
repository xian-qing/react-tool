/**
 * Created by stone on 2017/6/18.
 */
import React,{ Component, PropTypes }  from 'react';
import util from '../../utils/myMomen'
import './index.scss';
class Title extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user:{},
            input:'',
            msg:'',
            phone:'',
            placeholder:'请输入手机号',
            codeBtn:'获取验证码',
            timer:0,
            alertShow:false
        }
        //处理绑定方法
        var bind = [
            'download',
            'onChangeInput',
            'onFocus',
            'getCode',
            'setMsg'
        ].forEach((func)=>{
            this[func] = this[func].bind(this);
        })
    }
    back(){
        if(util.getArgs('code')){
            //微信登录pay.html 有code
            window.history.go(-2)
            return
        }
        window.history.back(-1)
    }
    onChangeInput(e){
        let value = e.target.value
        if(value.length<=11){
            this.setState({input:value})
        }
    }
    onFocus(){

    }
    getCode(){
        let me = this
        if(me.state.codeBtn!='获取验证码'){
            return
        }
        if(this.state.input.length!=11){
            this.setMsg('请输入正确手机号')
            return
        }
        let inputPhone = this.state.input;
        if(this.state.phone){
            inputPhone = this.state.phone;
        }
        let params = JSON.stringify({
            query:`mutation {
                 checkCode:checkCode(
                    phone:"${inputPhone}"                    #电话号码 
                ){
                  status
                  msg
                }
                }`
        })
        util.graphQlFn({params:params},res=>{
            let result = res.data.checkCode
            if(result.status == 0){
                let phone = this.state.input
                this.setState({
                    phone:phone,
                    placeholder:'请输入验证码',
                    input:''
                })
                this.state.timer = setInterval(r=>{
                    if(me.state.codeBtn=='获取验证码'){
                        me.setState({codeBtn:60})
                    }else {
                        me.state.codeBtn--
                        if(me.state.codeBtn<=0){
                            clearInterval(me.state.timer)
                            me.setState({codeBtn:'获取验证码'})
                        }else {
                            me.setState({codeBtn:me.state.codeBtn})
                        }
                    }

                },1000)
            }else {
                this.setMsg(result.msg)
            }
        })
    }
    setMsg(msg){
        let me = this
        this.setState({msg:msg},r=>{
            setTimeout(function () {
                me.setState({msg:''})
            },1000)
        })
    }
    download(){
        let phone = this.state.phone
        let code = this.state.input
        if(phone.length!=11){
            this.setMsg('请输入正确手机号')
            return
        }
        if(!code){
            this.setMsg('请输入验证码')
            return
        }
        let params = JSON.stringify({
            query:`mutation {
                   login:login(
                   phone:"${phone}" 
                   code:"${code}" #短信验证码登录
                 ) {
                     status # 0 成功 非0 失败
                     msg
                     user{ #用户信息
                     id
                     name
                     uid
                     token
                     avatar
                   }
                 }
                }`
        })
        util.graphQlFn({params:params},res=>{
            let result = res.data.login
            if(result.status==0){
                util.setCookie('token',result.user.token)
                util.setCookie('uid',result.user.uid)
                window.location.href = 'http://a.app1.qq.com/o/simple.jsp?pkgname=com.jgg.games&from=singlemessage'
            }else {
                this.setMsg(result.msg)
            }
        })
    }
    render(){
        return (
            <div id="LoginAlert">
                <div className="alertInput">
                    <div className="input-box">
                        <div>
                            <input type="number"  value={this.state.input} onChange={this.onChangeInput} onFocus={this.onFocus} placeholder={this.state.placeholder}/><div className="getCode" onClick={this.getCode}>{this.state.codeBtn}</div>
                        </div>
                        <div className="msg">{this.state.msg}</div>
                        <div className="btn" onClick={this.download}>
                            下载APP并领取礼包
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Title;