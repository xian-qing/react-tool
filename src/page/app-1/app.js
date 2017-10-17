/**
 * Created by stone on 2017/6/19.
 */
import React from 'react';
import util from '../../utils/myMomen'
import Marquee from './comp/marquee'
import HomeNav from '../../components/homeNav/index.js'
import UserInfo from '../../components/userInfo/index.js'
import HomeList from '../../components/homeList/index.js'
import DateTime from './comp/dateTime'
import {
    Route,
} from 'react-router-dom'
import './index.scss'
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            homeList:[],
            navTop:false,
            scrollLock:true,
            listStart:0,
            listId:'',
            listTime:'',
            loadingState:0,  //0 第一次加载 1 有数据 2 数据是空
            myCart:[]
        };
        //处理绑定方法
        var bind = [
            'navFn',
            'setTime',
            'getCart'
        ]
        bind.forEach(func=>{
            this[func] = this[func].bind(this);
        })
    }
    componentWillMount() {
        var that = this;
        that.getCart()
        //that.getHomeList(0);
        that.scrollFn();
        that.clearLocalStorage();
        console.log(1)
    }
    clearLocalStorage(){
        //清除本地缓存 每天清理次
        let nowDate = new Date().getDate();
        let cookieDate = util.getCookie('settlementDate');
        if(nowDate!=cookieDate){
            window.localStorage.setItem('settlement',JSON.stringify({}));
            util.setCookie('settlementDate',nowDate)
        }

    }
    render(){
        let loading = <div className="loading-gif"> </div>
        if(this.state.loadingState ==2){
            loading =  <div className="loading-No">没有更多赛事</div>
        }
        return (
            <div id="home">
                <UserInfo/>
                <Marquee/>
                <HomeNav clickNav={this.navFn} top={this.state.navTop}/>
                <DateTime setTime={this.setTime}/>
                <HomeList myCart={this.state.myCart} list={this.state.homeList}/>
                {loading}
                <a href="noviceBoot.html"><div className="course"></div></a>
            </div>
        )
    }
    getCart(){
        let params = JSON.stringify({
            query:`{
              myCart(
                token:"${util.getCookie('token')}"
              ) {
                betOption {
                  id
                }
              }
            }`
        })
        util.graphQlFn({params:params},res =>{
            let myCart = res.data.myCart;
            this.setState({myCart:myCart})
        })
    }
    navFn(id){
        this.setState({'listId':id,'listStart':0});
        this.setState({'homeList': []});
        this.getHomeList(0,id);
        $(window).scrollTop(0);
    }
    getHomeList(start,id){
        if(start == 0){
            this.setState({loadingState:0})
        }

        let that = this;
        that.state.scrollLock = false;
        let params =JSON.stringify({
            query:`{matches(gameCategory:"${id?id:this.state.listId}",offset:${start*10},limit:10){
                id
                description
                startTime
                endTime
                state
                leftTeamScore
                rightTeamScore
                leftTeam{id,name,logo}
                rightTeam{id,name,logo}
                game{name}
                BORound
                bet{id,BONumber,name,shortName,status,startTime,endTime,type,betOptions{id,title,isCorrect,people,odds}}
            }}`
        })
        util.graphQlFn({params:params},res=>{
            const getList = res.data.matches;
            let myList = that.state.homeList;
            if(start==0){
                myList = getList;
            }else {
                myList = myList.concat(getList);
            }
            if(getList.length == 0){
                this.setState({loadingState:2})
            }else {
                this.setState({loadingState:1})
            }

            //处理本地缓存和列表匹配-------------
            let save;
            try {
                save = JSON.parse(window.localStorage.getItem('settlement')||'{}');
            }catch (e) {
                save = {}
            }
            myList.forEach((v)=>{
                v.bet.forEach(vv=>{
                    vv.betOptions.forEach(vvv=>{
                        for(let s in save){
                            save[s].bet = save[s].bet ||[];
                            save[s].bet.forEach((sv,i)=>{
                                if(vvv.id == sv.betOptionId){
                                    vvv['add'] = true
                                }
                            })
                        }

                    })
                })
            });
            //到这是-------------

            that.setState({'homeList': myList},function () {
                if(getList.length==10){
                    that.state.scrollLock = true;
                    that.state.listStart++
                }

            });
        })
    }
    setTime(date){
        this.setState({listTime:date})
    }
    scrollFn(){
        var that = this;
        $(window).scroll(function () {
            var scroll = $(window).scrollTop();
            var fontSize = $('html').css('fontSize');
            var topHeight = parseInt(fontSize)*100/75;
            var hei  = $('.user-info').height() + $('.marquee').height();
            if(scroll>hei){
                that.setState({'navTop':true})
            }else {
                that.setState({'navTop':false})
            }
            var allHei = $('#box').height()-$(window).height();
            if(allHei - scroll<500){
                //在这里加一把锁
                if(that.state.scrollLock){
                    that.getHomeList(that.state.listStart)
                }
            }

        })
    }
}
export default Home;