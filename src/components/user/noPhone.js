/**
 * Created by wxq on 2017/6/28.
 */
import React from 'react';
import util from '../../utils/myMomen'
import DownAlert from '../downAlert/downAlert'
import Request from 'components/Request/request'

//redux
import { connect } from 'react-redux'
import { setPhone} from '../../action/user'
class noPhone extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phone:'',
            code:'',
            getCodeBtn:'获取验证码',
        }
        //处理绑定方法
        var bind = [
            'phoneInput',
            'codeInput',
            'getCode',
            'bindFn','focusInput',
            'quitLogin'
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
    bindFn(){
        var that = this;
        if(this.state.phone.length == 11&&this.state.code){
            this.props.axios({
                data:JSON.stringify({
                    query:`mutation {
                         bindPhone:bindPhone( 
                          token:"${this.props.getCookie('token')}"
                          phone:"${this.state.phone}"
                          code:"${this.state.code}"
                        ){
                          status 
                          msg
                        }
                        }
                        `
                })
            },res=>{
                if(res.data.bindPhone.status==0){
                    that.setState({'msg':''});
                    this.props.dispatch(setPhone(12312312312))
                    this.props.alert('绑定成功')
                }else {
                    //登录失败
                    this.props.alert(res.data.bindPhone.msg)

                }
            })
        }else if(this.state.phone.length != 11){
            that.setState({'msg':'请输入正确的手机号'});
        }else if(!this.state.code){
            that.setState({'msg':'请输入验证码'});
        }

    }
    focusInput(){
        this.setState({'msg':''});
    }
    getRecharge = (type)=>{
        console.log(412)
        if(type == 'close'){
            this.setState({'showDownAlert':false})
        }else {
            this.setState({'showDownAlert':true})
        }
    }
    quitLogin  = ()=>{
        util.setCookie('token','');

    }
    render(){
        return (
            <div>
                <div className="login-ed">
                    <DownAlert closeFn={this.getRecharge} show={this.state.showDownAlert}/>
                    <div className="qiutBtn" onClick={this.quitLogin}></div>
                    <div className="setBtn" onClick={this.getRecharge}></div>
                    <div className="no-phone">
                        <div className="phone-input">
                            <input type="number" value={this.state.phone} onChange={this.phoneInput} onFocus={this.focusInput}  placeholder="请输入手机号"/>
                        </div>
                        <div className="code">
                            <input type="number"  value={this.state.code} onChange={this.codeInput} onFocus={this.focusInput} placeholder="请输入验证码"/>
                            <div className={"code-btn " + (this.state.getCodeBtn !='获取验证码'?'code-btn-ing':'')} onClick={this.getCode}>{this.state.getCodeBtn}</div>
                        </div>
                        <div className="error-msg">{this.state.msg}</div>
                        <div className="login-btn" onClick={this.bindFn}>
                            绑定手机号
                        </div>
                    </div>

                </div>
            </div>
        )
    }

}
export default connect()(Request(noPhone));