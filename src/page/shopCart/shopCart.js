/**
 * Created by stone on 2017/6/19.
 */
import React from 'react';
import UserInfo from '../../components/userInfo/index.js'
import Title from '../../components/title/title'
import Settlement from './comp/settlement'
import util from '../../utils/myMomen'
import './index.scss'
class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showList:[],
            myList:[
                /*{
                 odds:1.42,
                 betId: '583acbedb6fc560728879213',
                 betOptionId:'583acc5db6fc56072887934f',
                 money:0,
                 cost:1
                 }*/
            ],
            carCount:0
        };
        //处理绑定方法
        var bind = [
            'setCallback',
            'clearAll'
        ]
        bind.forEach(func=>{
            this[func] = this[func].bind(this);
        })
    }
    setCallback(obj,type){
        //处理添加input 框的
        if(type){
            //type == 1 删除
            this.state.myList.forEach((v,i)=>{
                if(v.betId == obj.betId){
                    this.state.myList.splice(i,1)
                }
            })
        }else{
            this.state.myList.push(obj)
        }
        this.setState({'myList':this.state.myList})
    }
    getLocalStorageSave(){
        //localStorage保护
        let save;
        try {
            save = JSON.parse(window.localStorage.getItem('settlement')||'{}');
        }catch (e) {
            save = {}
        }
        this.setState({'myList':save});
        window.localStorage.setItem('tickDetail','[]');
    }
    clearAll(){
        /*this.state.showList.forEach(v=>{
         v.bet.forEach(vv=>{
         vv.betOptions.forEach(vvv=>{
         vvv['add'] = false
         })
         })
         });*/
        this.setState({'myList':{}});
        this.setState({'carCount':0});
        window.localStorage.setItem('settlement','')
    }
    componentDidMount() {
        //this.getLocalStorageSave()
    }
    render(){
        return (
            <div id="home">
                <UserInfo carCount={this.state.carCount}/>
                <Title title="结算单"/>
                {/* <Guild/>*/}
                {/*<HomeList single="true" setCallback={this.setCallback} list={this.state.showList}/>*/}
                <Settlement
                    clear={this.clearAll}
                    list={this.state.myList}
                />
            </div>
        )
    }
}
export default Detail;