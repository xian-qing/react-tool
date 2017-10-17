
/**
 * Created by stone on 2017/6/19.
 */
import React from 'react';
import util from '../../../utils/myMomen'
import MyAlert from  '../../../components/myAlert/myAlert'
import shareImg from '../../../image/shareImg.png'
class InputList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list:this.props.list,
            msg:'',
            alertText:'请在微信浏览器打开'
        };
        var bind = [
            'onChangeCount',
            'closeBtn',
            'selectFn',
            'guardian',
            'closeAlert'
        ].forEach(func=>{
            this[func] = this[func].bind(this);
        })
    }
    componentDidMount() {

    }
    componentWillReceiveProps(nextProps){
        this.setState({'list':nextProps.list})
    }

    onChangeCount(e){
        let name = e.target.name.split(',');
        let idx = name[0];
        let value = e.target.value;
        let key = name[1];
        if(value.split('')[0] == 0){
            let valArr =  value.split('')
            valArr.shift(0)
            value = valArr.join('')
        }
        this.state.list[key].bets[idx].betOption.money = value;
        this.setState({'list':this.state.list});
        this.props.callback(this.state.list)
    }
    closeBtn(key,idx,betOption){
        let params = JSON.stringify({
            query: `mutation {
              deleteCart(
                token:"${util.getCookie('token')}"
                betOption:"${betOption}"
              ) {
                status  #0，成功；非0，失败
                msg
              }
            }`
        })
        util.graphQlFn({params:params},res=>{
            let result = res.data.deleteCart
            if(result.status == 0){
                this.state.list[key].bets.splice(idx,1);
                if(this.state.list[key].bets.length < 1){
                    delete (this.state.list[key])
                }
                this.setState({list:this.state.list})
                this.props.callback(this.state.list);
                util.carCountAnimate(0);
                this.props.callback(this.state.list);
            }
        })
        /*this.state.list[key].bets.splice(idx,1);
         if(this.state.list[key].bet.length < 1){
         delete (this.state.list[key])
         }*/
        //this.setState({'list':this.state.list});
        //this.props.callback(this.state.list);
        //util.carCountAnimate(0);
    }
    guardian(game){
        console.log(game)


        let me = this;
        //守护天使
        let isNoInput = false;
        let selectLen = 0;
        /*let paramsStr = `mutation{ createBetAttempt(token:"${util.getCookie('token')}",totalGoldSpend:${game.gameTotal},totalCreditSpend :0,orders:[`;
         game.bets.forEach((v,i)=>{
         if(v.select){
         selectLen++;
         paramsStr+=`{odds:${v.betOption.odds}, betId :"${v.bet.id}", betOptionId:"${v.betOption.id}", money : ${v.betOption.money}, cost : 1 },`
         if(!v.betOption.money){
         isNoInput = true;
         }
         }


         });
         paramsStr+=`]){status,msg,lastMoment,attemptId}}`;*/
        let paramsStr = `mutation generateBetOrder{
                      generateBetOrder(
                        amount: ${game.gameTotal},
                        token: "${util.getCookie('token')}",
                        orders: [`;
        game.bets.forEach((v,i)=>{
            if(v.select){
                selectLen++;
                paramsStr+=`{match: "${game.match.id}",
                    bet: "${v.bet.id}",
                    betOption: "${v.betOption.id}",
                    amount: ${v.betOption.money},
                    odds: ${v.betOption.odds}},`
                if(!v.betOption.money){
                    isNoInput = true;
                }
            }


        });
        paramsStr+=`]) {
                    status
                    msg
                    betOrderID
                  }
                }`;

        if(selectLen==0){
            me.props.setMsg('请选择需要守护的选项');
            return
        }

        if(isNoInput){
            me.props.setMsg('请输入竞币');
            return
        }

        let params = JSON.stringify({
            query:paramsStr
        });


        console.log(paramsStr)
        util.graphQlFn({params:params,url:'/graphql'},res=>{
            let r = res.data.generateBetOrder;
            if(r.status == 0){
                window.location.href = `share-order.html?me=1&guardian=1&betOrderID=${r.betOrderID}&user=${util.getCookie('uid')}`
            }else {
                me.props.setMsg(r.msg);
            }
        })



        return              //todo 等待删除旧 的接口


        if(util.getBrowserType() == 'wx'){
            let head= document.getElementsByTagName('head')[0];
            let script= document.createElement('script');
            script.type= 'text/javascript';
            script.src= 'http://res.wx.qq.com/open/js/jweixin-1.2.0.js';
            head.appendChild(script);

            util.graphQlFn({params:params},res=>{
                let status = res.data.createBetAttempt.status;
                if(status ==0 ){

                    let attemptId = res.data.createBetAttempt.attemptId;
                    //let shareUrl = `http://114.112.106.129/game/betprotect/${attemptId}`;
                    let shareUrl = `http://m.wxqing.cn/guardian/${attemptId}`;
                    util.wxShare({
                        shareOption:{
                            title:'JGG守护天使',
                            link:shareUrl,
                            imgUrl:'http://m.wxqing.cn/image/jgg.png',
                            desc:'快来帮我一起守护吧！'
                        }
                    },()=>{
                        me.setState({
                            alertText:'wx',
                            alertShow:true
                        });
                    });
                }else {
                    me.props.setMsg(res.data.createBetAttempt.msg)
                }

            });
        }else {
            this.setState({
                alertShow:true
            });
        }

    }
    closeAlert(){
        console.log(123)
        this.setState({
            alertShow:false
        });
    }
    selectFn(type,key,idx){
        let myList =  this.state.list
        if(type == 1){
            //选择整个赛事
            if(!myList[key].select){
                myList[key]['select'] = true;
                myList[key].bets.forEach((v,i)=>{
                    v['select'] = true
                })
            }else {
                myList[key]['select'] = false;
                myList[key].bets.forEach((v,i)=>{
                    v['select'] = false
                })
            }
        }
        if(type == 2){
            //选择单个
            let length =myList[key].bets.length;
            let selectLen = 0;
            myList[key].bets.forEach((v,i)=>{
                if(i == idx){
                    if(!v.select){
                        v['select'] = true
                    }else {
                        v['select'] = false
                    }
                }
                if(v['select']){
                    selectLen ++
                }

            })
            if(length == selectLen)
                myList[key]['select'] = true;
            else
                myList[key]['select'] = false;
        }
        this.setState({'list':myList});
        this.props.callback(myList)
    }
    render(){
        var settlementList = [];
        let objList = this.state.list;
        for(let o in objList){
            let inList = [];
            let detail = objList[o];
            let total = 0;
            detail.bets.map((v,i)=>{
                let bo = '全场';
                if(v.bet.BONumber!=0){
                    bo =  `第${v.bet.BONumber}局`
                }
                total+=Number(v.money);
                inList.push(
                    <div className="list" key={i}>
                        <div className={"select " + (v.select?'select-active':'')}  onClick={this.selectFn.bind(this,2,o,i)}></div>
                        <div className="close" onClick={this.closeBtn.bind(this,o,i,v.betOption.id)}></div>
                        <div className="name">【{bo}】{v.bet.shortName}</div>
                        <div className="gameWin">{v.betOption.title}胜</div>
                        <div className="profit">
                            <div>
                                <div className="input">
                                    <div className="gold-icon"></div><input value={v.betOption.money} name={i+','+o}  onChange={this.onChangeCount.bind(this)} type="number"/>
                                </div>
                            </div>
                            <div className="text-center">x{v.betOption.odds}</div>
                            <div>
                                <div className="input-get">
                                    <div className="gold-icon"></div>
                                    <div className="get">{parseInt(v.betOption.money*v.betOption.odds*100)/100}</div>
                                </div>
                            </div>
                            <div className="color">竞猜金额</div>
                            <div className="text-center color">收益率</div>
                            <div className="text-right color">预计收益</div>
                        </div>
                    </div>
                )
            });
            settlementList.push(
                <div className="aGame" key={o}>
                    <div className="game-detail">
                        <div className={"select " + (detail.select?'select-active':'')} onClick={this.selectFn.bind(this,1,o)}></div>
                        <div className="logo">
                            <img src={detail.match.leftTeam.logo} alt=""/>
                            vs
                            <img src={detail.match.rightTeam.logo} alt=""/>
                        </div>
                        <span>{detail.match.game.name}</span>
                        <div className="time">
                            {util.getTimeAll(detail.startTime)}
                        </div>
                    </div>
                    {inList}
                    <div className="guardian">
                        <div>
                            <div className="gold-icon"></div>
                            <div className="aGame-total">{detail.gameTotal||0}</div>
                        </div>
                        {/*<div className="btn" onClick={this.guardian.bind(this,objList[o])}>守护天使</div>*/}
                    </div>
                </div>
            )
        }
        return (
            <div className="settlementList">
                <div className={"alert-layer " + (this.state.alertShow?'alert-layer-show':'')}  onClick={this.closeAlert}>
                    {this.state.alertText=='wx'? <img src={shareImg} alt=""/>:this.state.alertText}
                </div>
                {settlementList}
            </div>

        )
    }
}



export default class Settlement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myList:this.props.list,
            total:0,          //总额
            totalBets:0,     //投注总额
            totalExpect:0,     //预期总收益
            msg:'',
            showChangeBtn:false,
            allSelect:false

        }
        var bind = ['getMyCart','onChangeCount','getDate','clearAll','BetFn','closeAlert','selectAll','setMsg'].forEach(func=>{
            this[func] = this[func].bind(this);
        })

    }
    componentDidMount() {
        this.getMyCart()
    }
    componentWillReceiveProps(nextProps){
        this.setState({'myList':nextProps.list});
        //this.getDate(nextProps.list)
    }
    getMyCart(){
        let params = JSON.stringify({
            query:`{
              myCart(
                token:"${util.getCookie('token')}"
              ) {
                match {
                  id
                  game {
                    name			#联赛名称
                  }
                  leftTeam {	
                    name			#左队
                    logo
                  }
                  rightTeam {
                    name			#右队
                    logo
                  }
                  startTime		#开始时间
                }
                bet {
                  id
                  name				#竞猜名称
                  BONumber		#0，全场；1，第一局；2，第二局；……
                  shortName
                }
                betOption {
                  id
                  title				#竞猜选项标题
                  odds				#竞猜赔率
                }
              }
            }`
        })
        util.graphQlFn({params:params},res=>{
            let myCart = res.data.myCart
            let newMyCart = {}
            myCart.forEach(v=>{
                if(!newMyCart[v.match.id]){
                    newMyCart[v.match.id]  =  {
                        match:v.match,
                        bets:[
                            {
                                bet:v.bet,
                                betOption:Object.assign(v.betOption,{money:0}),
                            }
                        ]
                    }
                }else {
                    newMyCart[v.match.id].bets.push({
                        bet:v.bet,
                        betOption:Object.assign(v.betOption,{money:0}),
                    })
                }
            })
            this.setState({myList:newMyCart})
        })
    }
    onChangeCount(e){
        var value = e.target.value;
        this.setState({total:value})
    }
    getDate(data){
        var total = 0;
        var totalBets = 0;
        var totalExpect = 0;
        for(let o in data){
            let gameTotal = 0;
            data[o].bets.forEach((v,i)=>{
                if(v['select']){
                    gameTotal+=Number(v.betOption.money)
                    total+=Number(v.betOption.money);
                }
            })
            data[o]['gameTotal'] = gameTotal;
        }
        this.setState({
            'myList':data,
            'totalBets':totalBets,
            'total':total,
            'totalExpect':totalExpect
        });
        this.setState({myList:data})
        //window.localStorage.setItem('settlement',JSON.stringify(data))
    }
    clearAll(){
        //this.props.clear();
        let params = JSON.stringify({
            query:`mutation {
                  clearCart(
                    token:"${util.getCookie('token')}"
                  ) {
                    status  #0，成功；非0，失败
                    msg
                  }
                }`
        })
        util.graphQlFn({params:params},res =>{
            if(res.data.clearCart.status == 0){
                this.setState({myList:{}})
            }
        })
        util.carCountAnimate(0,0);
    }
    BetFn(friendPay){
        if(!util.getCookie('token')){
            this.setState({msg:'请登录'});
            return
        }
        let me = this;
        let myList = this.state.myList;
        //console.log(this.state.myList);
        /*let paramsStr = 'mutation { multiBetOrder(token:"'+util.getCookie('token')+'",totalGoldSpend:'+this.state.totalBets+',totalCreditSpend :0,orders:[';
         let isNoInput = false;
         this.state.myList.forEach(v=>{
         if(!v.money){
         isNoInput = true;
         }
         paramsStr+='{odds:'+v.odds+', betId :"'+ v.betId+'", betOptionId:"'+v.betOptionId+'", money : '+v.money+', cost : 1 },'
         });
         paramsStr+=']){status, msg,ticketUsed{condition state icon}}}';*/
        //console.log(paramsStr)

        //验证数据是否准确
        let isNoInput = false;
        let isNoSelect = true;
        for(let i in myList){
            myList[i].bets.forEach((v,i)=>{
                if(v.select){
                    isNoSelect = false;
                    console.log(v.betOption.money)
                    if(!v.betOption.money){
                        isNoInput = true;
                    }
                }

            })
        }
        if(isNoSelect){
            //如果未输入钱
            me.setState({msg:'请至少选择一个赛事'});
            return
        }
        if(isNoInput){
            //如果未输入钱
            me.setState({msg:'请输入竞币'});
            return
        }





        let paramsStr = `mutation generateAndPayBetOrder{
                             generateAndPayBetOrder(
                             token: "${util.getCookie('token')}",  #用户token
                             amount:${this.state.total},				#下注总金额
                             orders: [`
        for(let m in myList){
            let mObj = myList[m]
            mObj.bets.forEach(v=>{
                if(v.select){
                    paramsStr += `{
                        match:"${mObj.match.id}",
                        bet:"${v.bet.id}",
                        betOption:"${v.betOption.id}",
                        amount:${v.betOption.money},
                        odds:${v.betOption.odds},
                        },`
                }
            })

        }


        paramsStr +=`]) {
                        status
                        msg
                        betOrderID			#下注订单ID
                      }
                    }`


        if(friendPay){
            paramsStr = paramsStr.replace(/generateAndPayBetOrder/g,'generateBetOrder')
        }
        let params = JSON.stringify({
            query:paramsStr
        })
        //console.log(params)
        util.graphQlFn({params:params,url:'/graphql'},res=>{
            if(friendPay){
                let r  = res.data.generateBetOrder
                if(r.status == 0){
                    window.location.href = `share-order.html?me=1&guardian=1&betOrderID=${r.betOrderID}&user=${util.getCookie('uid')}`
                }else {
                    this.setMsg(r.msg)
                }


            }else {
                let r  = res.data.generateAndPayBetOrder
                if(r.status == 0){
                    this.getMyCart()
                    this.setMsg('下注成功')
                    window.location.href =`share-order.html?me=1&betOrderID=${r.betOrderID}&user=${util.getCookie('uid')}`
                }else {
                    this.setMsg(r.msg)
                }
            }

        })
    }
    detailSaveLocalStorage(obj){
        window.localStorage.setItem('tickDetail',JSON.stringify(obj))
    }
    setMsg(msg){
        this.setState({msg:msg});
    }
    closeAlert(){
        this.setState({msg:''})
    }
    selectAll(){
        let myList = this.state.myList;
        if(this.state.allSelect){
            for(let i in myList){
                myList[i]['select'] = false;
                myList[i].bets.forEach((v,i)=>{
                    v['select'] = false;
                })
            }
        }else {
            for(let i in myList){
                myList[i]['select'] = true;
                myList[i].bets.forEach((v,i)=>{
                    v['select'] = true;
                })
            }
        }

        this.setState({
            'allSelect':!this.state.allSelect,
            'myList':myList
        })
        this.getDate(myList)
    }
    render(){
        return (
            <div className="settlement">
                <MyAlert close={this.closeAlert} msg={this.state.msg}/>
                {/* <div className="title">结算单</div>*/}
                <InputList callback={this.getDate} setMsg={this.setMsg} list={this.state.myList} />
                <div className="Total">
                    <div className="handle">
                        <div className="all-select">
                            <div className={"select " + (this.state.allSelect?'select-active':'')} onClick={this.selectAll}></div>全选
                        </div>

                        <div className="btn" onClick={this.BetFn}>马上投注</div>

                        <div className="all">
                            <div className="gold-icon"></div>
                            <div className="aGame-total">{this.state.total}</div>
                        </div>
                        <div>
                            合计：
                        </div>
                    </div>
                    <div className="clear-go">
                        <div className="clear" onClick={this.clearAll}>清空</div>
                        <div className="friendPay" onClick={()=>{this.BetFn(1)}}>好友代付</div>
                        <a href="recharge.html"><div className="btn" onClick={this.BetFn}>竞币不足?<span>获取竞币>></span></div></a>
                    </div>
                </div>
            </div>
        )
    }
}

