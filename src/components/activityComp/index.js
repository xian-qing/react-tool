/**
 * Created by stone on 2017/6/18.
 */
import React from 'react';
import './index.scss';
export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        //处理绑定方法
        var bind = [

        ]
        bind.forEach(func=>{
            this[func] = this[func].bind(this);
        })
    }
    componentWillReceiveProps(nextProps){
    }
    componentDidMount(){
    }
    render(){
        return (
            <div className="Header">
                <div className="back-icon"></div>
                <div className="header-text">
                    新手任务 : <span>{'疯狂八月猜猜猜'}</span>
                </div>
            </div>
        )
    }
}

export class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        //处理绑定方法
        var bind = [

        ];
        bind.forEach(func=>{
            this[func] = this[func].bind(this);
        })
    }
    componentWillReceiveProps(nextProps){


    }
    componentDidMount(){

    }
    render(){
        return (
            <div className="User">
               <div className="user-av"></div>
               <div className="user-name">谁谁谁</div>
                <div className="user-credit">
                    <div className="icon"></div>6666
                </div>
               <div className="user-Gold">
                   <div className="icon"></div>6666
               </div>

            </div>
        )
    }
}
export class Refresh extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        //处理绑定方法
        var bind = [

        ];
        bind.forEach(func=>{
            this[func] = this[func].bind(this);
        })
    }
    componentWillReceiveProps(nextProps){


    }
    componentDidMount(){

    }
    render(){
        return (
            <div className="Refresh">
                <div className="fresh-btn">
                    刷新 <div className="icon"></div>
                </div>
                <div className="follow-btn">
                    关注<div className="icon"></div>
                </div>
                <div className="info">
                    <p className="p-name">截至时间</p>
                    <p>2017.09.21</p>
                </div>
            </div>
        )
    }
}