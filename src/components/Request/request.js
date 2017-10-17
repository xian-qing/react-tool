/**
 * Created by wxq on 2017/9/13.
 * 封装了请求 alert confirm
 * 使用 confirm 需要 添加 getConfirm(msg) 方法 根据msg判断确定返回
 */

import React,{ Component } from 'react'
import Axios from 'axios'
Axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8'
import './index.scss'
const Request  = (ComposedComponent) => class extends Component {
    constructor() {
        super()
        this.state = {
            loading: false,
            alertMsg:'',
            confirmMsg:'',
            confirmYes:false
        }
    }
    componentDidMount() {

    }
    request = (option = {},callback) =>{
        if(option.loading){
            this.setState({loading: true})
        }
        Axios({
            method:"POST",
            url:option.url==1?'/graphql':'/api/graphql',
            data:option.data
        }).then((response) => {
            callback(response.data)
            if(this.state.loading){
                this.setState({loading: false})
            }
        }).catch(function (error) {
            console.log(error)
            if(this.state.loading){
                this.setState({loading: false})
            }
        })
    }
    alert = (msg) =>{
        if(msg){
            this.setState({alertMsg:msg})
        }

    }
    confirm = (msg) =>{
        if(msg){
            this.setState({confirmMsg:msg})
        }

    }
    getArgs = (strParame)=>{
        var args = new Object();
        var query;
        if(arguments.length == 2)
            query = arguments[1];
        else
            query = location.search.substring(1);

        var pairs = query.split("&");
        for(var i = 0; i < pairs.length; i++) {
            var pos = pairs[i].indexOf('=');
            if (pos == -1) continue;
            var argname = pairs[i].substring(0,pos);
            var value = pairs[i].substring(pos+1);
            value = decodeURIComponent(value);
            args[argname] = value;
        }
        return args[strParame];
    }
    getCookie = (c_name) =>{
        var i,x,y,ARRcookies=document.cookie.split(";");
        for (i=0;i<ARRcookies.length;i++)
        {
            x=ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
            y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
            x=x.replace(/^\s+|\s+$/g,"");
            if (x==c_name)
            {
                return unescape(y);
            }
        }
        return null;
    }
    setCookie = (c_name, value,day)=> {
        var exdays = day || 30; //360天 修改成30
        var exdate=new Date();
        exdate.setDate(exdate.getDate() + exdays);
        var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
        document.cookie=c_name + "=" + c_value + "; path=/";
    }
    render() {
        let loadingSvg =
            <div id="loading-svg">
                <svg className="loading-svg" viewBox="0 0 120 120" version="1.1" >
                    <g  className="g-circles g-circles--v3">
                        <circle id="12" transform="translate(35, 16.698730) rotate(-30) translate(-35, -16.698730) " cx="35" cy="16.6987298" r="10"></circle>
                        <circle id="11" transform="translate(16.698730, 35) rotate(-60) translate(-16.698730, -35) " cx="16.6987298" cy="35" r="10"></circle>
                        <circle id="10" transform="translate(10, 60) rotate(-90) translate(-10, -60) " cx="10" cy="60" r="10"></circle>
                        <circle id="9" transform="translate(16.698730, 85) rotate(-120) translate(-16.698730, -85) " cx="16.6987298" cy="85" r="10"></circle>
                        <circle id="8" transform="translate(35, 103.301270) rotate(-150) translate(-35, -103.301270) " cx="35" cy="103.30127" r="10"></circle>
                        <circle id="7" cx="60" cy="110" r="10"></circle>
                        <circle id="6" transform="translate(85, 103.301270) rotate(-30) translate(-85, -103.301270) " cx="85" cy="103.30127" r="10"></circle>
                        <circle id="5" transform="translate(103.301270, 85) rotate(-60) translate(-103.301270, -85) " cx="103.30127" cy="85" r="10"></circle>
                        <circle id="4" transform="translate(110, 60) rotate(-90) translate(-110, -60) " cx="110" cy="60" r="10"></circle>
                        <circle id="3" transform="translate(103.301270, 35) rotate(-120) translate(-103.301270, -35) " cx="103.30127" cy="35" r="10"></circle>
                        <circle id="2" transform="translate(85, 16.698730) rotate(-150) translate(-85, -16.698730) " cx="85" cy="16.6987298" r="10"></circle>
                        <circle id="1" cx="60" cy="10" r="10"></circle>
                    </g>
                </svg>
            </div>
        let alert =
            <div className="wqx-Alert">
                <div className="content">
                    <div className="msg">
                        {this.state.alertMsg}
                    </div>
                    <div className="close" onClick={()=>{this.setState({alertMsg:''})}}>
                        关闭
                    </div>
                </div>
            </div>
        let confirm =
            <div className="wqx-Alert">
                <div className="content">
                    <div className="msg">
                        {this.state.confirmMsg}
                    </div>
                    <div className="close" >
                        <div className="cancle" onClick={()=>{this.setState({confirmMsg:''})}}>
                            取消
                        </div>
                        <div className="yes" onClick={()=>{this.refs.confirmYes.getConfirm(this.state.confirmMsg);this.setState({confirmMsg:''});}}>
                            确定
                        </div>

                    </div>
                </div>
            </div>
        return (
            <div>
                {this.state.loading?loadingSvg:''}
                {this.state.alertMsg?alert:''}
                {this.state.confirmMsg?confirm:''}
                <ComposedComponent {...this.props}
                                   axios={this.request}
                                   alert={this.alert}
                                   confirm={this.confirm}
                                   getArgs={this.getArgs}
                                   setCookie={this.setCookie}
                                   getCookie={this.getCookie}
                                   ref="confirmYes"
                />
            </div>

        )
    }
}
export default Request