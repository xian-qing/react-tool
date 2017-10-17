/**
 * Created by stone on 2017/6/18.
 */
import React,{ Component, PropTypes }  from 'react';
import './index.scss';
class MyAlert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content:this.props.msg,
        }
        //处理绑定方法
        var bind = [
            'close'
        ];
        bind.forEach(func=>{
            this[func] = this[func].bind(this);
        })
    }
    componentWillReceiveProps(nextProps){
        this.setState({content:nextProps.msg})
    }
    close(){
        this.props.close()
    }
    render(){
        return (
            <div  className={"myAlert "+ (this.state.content?'myAlert-show':'')}  >
                <div className="content">
                    {this.state.content}
                    <div className="close-btn" onClick={this.close}>
                        关闭
                    </div>
                </div>
            </div>
        )
    }
}

export default MyAlert;