/**
 * Created by stone on 2017/6/18.
 */
import React from 'react';
import './index.scss';
import alertImg from '../../image/downalert_03.png';
class DownAlert extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show:this.props.show||false
        }
        //处理绑定方法
        var bind = [
            'close',
        ]
        bind.forEach(func=>{
            this[func] = this[func].bind(this);
        })
    }
    close(){
        this.setState({'show':false});
        this.props.closeFn('close')
    }
    componentWillReceiveProps(nextProps){
        this.setState({'show':nextProps.show})

    }
    componentDidMount(){

    }
    render(){
        return (
            <div className={'downALert ' + (this.state.show?'downALert-show':'')}>
                <div className="down-alert">
                    <div className="downALert-back" onClick={this.close}></div>
                    <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.jgg.games&from=singlemessage&isappinstalled=1">
                        <div className="link"></div>
                    </a>
                    <img src={alertImg} alt=""/>
                </div>
            </div>
        )
    }
}

export default DownAlert;