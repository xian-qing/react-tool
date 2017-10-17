/**
 * Created by stone on 2017/6/17.
 * 首页列表
 */
import React from 'react'
import './index.scss'
import util from '../../utils/myMomen.js'
import MyAlert from  '../../components/myAlert/myAlert'
//import LazyLoad from 'react-lazyload';
//import def from '../../image/def-img.png'
class InList extends React.Component {
    constructor(props) {
        super(props);
        //console.log(props)
        this.state = {
            single:this.props.single,
            show:this.props.single?'true':this.props.show,
            //betList:this.props.list,
            betList:{},
            id:this.props.id,
            gameStatus:this.props.gameStatus,
            statusText:{
                '-1': '进行中',
                '0':'未开始',
                '1':'竞猜中',
                '2':'停止竞猜',
                '3':'结束竞猜',
                '4':'取消竞猜',
            },
            msg:''
        };
        //处理绑定方法
        var bind = [
            'jump',
            'setAdd',
        ];
        bind.forEach(func=>{
            this[func] = this[func].bind(this);
        })
    }
    componentWillMount() {
        this.dataInit(this.props.list)
    }
    dataInit(listArr){
        let newObj = {};
        listArr.forEach((v,i)=>{
            if(newObj[v.BONumber]){
            }else {
                newObj[v.BONumber] = []
            }
            newObj[v.BONumber].push(v)
        })
        let myCart = this.props.myCart
        myCart.forEach(c=>{
            for(let m in newObj){
                newObj[m].forEach(v=>{
                    v.betOptions.forEach(vv=>{
                        if(c.betOption.id == vv.id){

                            vv['add'] = true
                        }

                    })
                })
            }
        })
        this.setState({betList:newObj})

    }
    componentWillReceiveProps(nextProps){
        var me = this;
        if(this.state.single){
            this.setState({'show':true})
        }else {
            this.setState({'show':nextProps.show});
            //me.localStorageSave([])
        }
    }
    jump(id){
        window.location.href = 'gameDetail.html'
    }
    setAdd(e,id,optionId,key){
        e.persist();
        let pageX,pageY;
        pageX = e.clientX
        pageY = e.clientY
        this.state.betList[key].forEach(v=>{
            if(v.id == id){
                v.betOptions.forEach(vv=>{
                    if(vv.id == optionId){
                        if(vv.add){
                            vv['add'] = false;

                            //if(this.state.single){
                                var obj = {};
                                obj.id = this.state.id;
                                obj.betOptionId = vv.id;
                                //this.props.callback(obj,1)
                            this.cartUpdate(0, vv.id,()=>{
                                util.carCountAnimate(0)
                            })
                            //}
                        }else {
                            vv['add'] = true;
                            //detail 用的
                            //if(this.state.single){
                            //console.log(v)
                                var obj = {};
                                obj.id = this.state.id;
                                obj.betId = v.id;
                                obj.betOptionId = vv.id;
                                obj.odds = vv.odds;
                                obj.money = '';
                                obj.cost = 1;
                                obj.name = v.name;
                                obj.shortName = v.shortName;
                                obj.title = vv.title;
                                obj.BONumber = v.BONumber;
                                //this.props.callback(obj)
                            this.cartUpdate(1, vv.id,()=>{
                                util.addAnimate(pageX,pageY)
                                util.carCountAnimate(1)
                            })
                            //}
                        }
                    }
                })
            }
        });
        this.setState({'betList':this.state.betList});
    }
    cartUpdate(type,opId,callback){
        //type 1 = add 0 delete
        let token = util.getCookie('token');
        if(type==1){
            let params = JSON.stringify({
                query:`
                mutation {
                  addCart(
                    token:"${token}"
                    betOptions:["${opId}"]
                  ) {
                    status
                    msg
                  }
                }`
            })
            util.graphQlFn({params:params},res=>{
                let r = res.data.addCart
                if(r.status==0){
                    callback()
                }else {
                    this.setState({msg:r.msg})
                }

            })
        }else {
            let params = JSON.stringify({
                query:`
                mutation {
                  deleteCart(
                    token:"${token}"
                    betOption:"${opId}"
                  ) {
                    status  #0，成功；非0，失败
                    msg
                  }
                }`
            })
            util.graphQlFn({params:params},res=>{
                let r = res.data.deleteCart
                if(r.status==0){
                    callback()
                }else {
                    this.setState({msg:r.msg})
                }
            })
        }
    }
    localStorageSave(betList) {
        //暂时没用
        //把当前的添加记录存在localStorage
        var arr = []
        betList.forEach(v=>{
            v.betOptions.forEach(vv=>{
                if(vv.add){
                   var obj = {}
                   obj.betId = v.id
                   obj.betOptionId = vv.id;
                   obj.odds = vv.odds;
                   obj.money = '';
                   obj.cost = 1;
                   obj.name = v.name;
                   obj.shortName = v.shortName;
                   obj.title = vv.title;
                   arr.push(obj)
                }
            })
        });
        window.localStorage.setItem('saveSettlement',JSON.stringify(arr))
    }
    render(){
        var that = this;
        var betList = [];
        let keyLength = this.state.betList[1];
        for(let key in  this.state.betList){
            let Bo = this.state.betList[key];
            let BONumberTest = '';
            if(key != 0){
                BONumberTest  = '第'+ key + '局'
            }else {
                BONumberTest  = '全场';
            }
            let BoList = [];

            Bo.map((v,i)=>{
                var optionLeft = v.betOptions[0]?v.betOptions[0]:{};
                var optionRight = v.betOptions[1]?v.betOptions[1]:{};
                //根据时间判断
                var time = '';
                let nowDate = parseInt(+new Date()/1000);
                /*if(v.startTime >nowDate){
                    time = util.getTimeAfter(v.startTime) +'开始'
                }else if(v.startTime < nowDate && v.endTime>nowDate){
                    time = util.getTimeAfter(v.endTime) + '结束'
                }else {
                    //time = '已结束'
                    time = ''
                    if(v.status != '-1'){
                        time = '已结束'
                    }
                }*/
                if(v.status==0){
                    time = util.getTimeAfter(v.startTime) +'开始'
                }else if(v.status==-1){
                    time = util.getTimeAfter(v.endTime) + '结束'
                    //手动判断
                    if(v.endTime<nowDate){
                        v.status=2
                        time = '结算中'
                    }
                }else if(v.status==2){
                    time = '结算中'
                }else if(v.status==3){
                    time = '结算完成'
                }else if(v.status==4){
                    time = '竞猜取消'
                }


                //如果结束 显示win
                let isEnd = v.status!= -1?true:false;
                //let GameEnd = this.state.gameStatus==2?true:false;
                let GameEnd = v.status==3?true:false;
                BoList.push(
                    <div key={key+i} className={"list-in "+ (isEnd?'list-end ':'') + (GameEnd?'game-end':'')}>
                        <div className="left">
                            <div className="rate">
                                <div>{optionLeft.odds}</div>
                                <div>竞率</div>
                            </div>
                            <div className={'add-icon '+(optionLeft.add?'add-icon-add':'')}  onClick={(e)=>{
                                this.setAdd(e,v.id,optionLeft.id,key)
                            }}></div>
                        </div>
                        <div className="center">
                            <div className={'btn '+(v.status=='-1'?'':'btn-off')}>
                                {v.shortName}
                            </div>
                            <div className="time">{time}</div>
                        </div>
                        <div className="right">
                            <div className="rate">
                                <div>{optionRight.odds}</div>
                                <div>竞率</div>
                            </div>
                            <div className={'add-icon '+(optionRight.add?'add-icon-add':'')}  onClick={(e)=>{
                                this.setAdd(e,v.id,optionRight.id,key)
                            }}></div>
                        </div>
                        <div className={"win " + (optionRight.isCorrect?'win-right':'')}>
                        </div>

                    </div>
                )
            })

            betList.push(
                <div key={key}>
                    <div className={"boNumber " + (keyLength?'':'boNumber-hide')}>
                        {BONumberTest}
                    </div>
                    {BoList}
                </div>
            )
        }
        return (
            <div className={'detail-list '+(this.state.show?'show':'')} >
                <MyAlert close={()=>{this.setState({msg:''})}} msg={this.state.msg}/>
                {betList}
            </div>
            )

    }
}

class HomeList extends React.Component {
    constructor(props) {
        super(props);
        //console.log(props)
        this.state = {
            single:this.props.single || false,
            showList:this.props.list,
            myCart:[]
        };
        console.log(this.props.myCart)
        //处理绑定方法
        var bind = [
            'jump',
            'showDetail',
            'InListCallBack',
        ]
        bind.forEach(func=>{
            this[func] = this[func].bind(this);
        })
    }
    componentDidMount() {
        var that = this
        $("body").scroll(function() {
            console.log(234)
        });
    }
    componentWillReceiveProps(nextProps){
        this.setState({'showList':nextProps.list,myCart:nextProps.myCart});
    }
    jump(id){
    }
    showDetail(id){
        this.state.showList.forEach(v=>{
            if(v.id == id){
                if(v.showDetail){
                    v['showDetail'] = false
                }else {
                    v['showDetail'] = true
                }
            }
        });
        this.setState({'showList':this.state.showList});
        this.forceUpdate()
    }
    InListCallBack(obj,remove){
        //处理数据
        let localOBj;
        //本地缓存保护
        try {
            localOBj = JSON.parse(window.localStorage.getItem('settlement')||'{}');
        }catch (e){
            localOBj = {}
        }
        let list = this.state.showList;
        if(remove == 1){
            //移除
            localOBj[obj.id].bet.forEach((v,i)=>{
                if(v.betOptionId == obj.betOptionId){
                    localOBj[obj.id].bet.splice(i,1)
                    if(localOBj[obj.id].bet.length == 0){
                        delete(localOBj[obj.id])
                    }
                }
            });
            util.carCountAnimate(0)
        }else {
            //添加
            if(!localOBj[obj.id]){
                list.forEach((v,i)=>{
                    if(v.id == obj.id){
                        localOBj[obj.id] = v;
                        localOBj[obj.id].bet = [obj];
                    }
                });
            }else {
                localOBj[obj.id].bet.push(obj)
            }
            util.carCountAnimate(1)
        }
        window.localStorage.setItem('settlement',JSON.stringify(localOBj))
       //this.props.setCallback(text,type)
    }
    render(){
        var divList = [];
        this.state.showList.map((v,i)=>{
            var time = '';
            if(v.state == 0){
                let nowTime = parseInt(+new Date()/1000)
                if(nowTime < v.startTime){
                    time =  util.getTimeAfter(v.startTime);
                }
            }else if(v.state == 1) {

            }else {
                time =  (v.leftTeamScore ||0) +' - ' + (v.rightTeamScore||0);
            }
            v.leftTeam = v.leftTeam || {};
            v.rightTeam = v.rightTeam || {};
            divList.push(
                    <div key={i}  className="list">
                        <div className="detail" onClick={this.showDetail.bind(this,v.id)}>
                            <div className="left">
                                <img src={v.leftTeam.logo}  alt=""/>
                                <div className="team-name">{v.leftTeam.name}</div>
                            </div>
                            <div className="center">
                                <div className="name">{v.game?v.game.name:''}</div>
                                <div className='btn'>
                                    <div className={v.state==0?'not-start':''}>竞猜</div>
                                    {/*<div className={v.state==1?'ing':''}>竞猜中</div>*/}
                                    <div className={v.state!=0?'end':''}>已结束</div>
                                </div>
                                <div className="time">{time}</div>

                            </div>
                            <div className="right">
                                    <img src={v.rightTeam.logo} alt=""/>
                                <div className="team-name">{v.rightTeam.name}</div>
                            </div>
                            {this.state.single?'':<div className="show-div">
                                <div className={"rotate-dowm "+(v.showDetail?'rotate-top':'')} ></div>
                            </div>}
                        </div>
                        <InList
                            single={this.state.single}
                            show={v.showDetail}
                            callback={this.InListCallBack}
                            id={v.id}
                            list={v.bet}
                            gameStatus={v.state}
                            myCart={this.state.myCart}
                        />
                    </div>
              )
        })
        return (
            <div className="HomeList">
                {divList}
            </div>
        )
    }

}
export default HomeList;
