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
            title:this.props.title,
            right:this.props.right
        }
        //处理绑定方法
        var bind = [
            'back',
        ]
        bind.forEach(func=>{
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
    render(){
        return (
            <div id="title" className="title">
                <div className="back-btn" onClick={this.back.bind(this)}></div>
                <div className="title-name">{this.state.title}</div>
                <div className="right-div">
                    {this.state.right?this.state.right:''}
                </div>
            </div>
        )
    }
}

export default Title;