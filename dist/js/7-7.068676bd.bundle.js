webpackJsonp([7],{686:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}function l(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),i=n(14),c=a(i),u=n(612),d=a(u),m=n(687),f=a(m),h=n(690),p=a(h),g=function(e){function t(e){l(this,t);var n=s(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));n.state={list:n.props.list,msg:"",alertText:"请在微信浏览器打开"};["onChangeCount","closeBtn","selectFn","guardian","closeAlert"].forEach(function(e){n[e]=n[e].bind(n)});return n}return r(t,e),o(t,[{key:"componentDidMount",value:function(){}},{key:"componentWillReceiveProps",value:function(e){this.setState({list:e.list})}},{key:"onChangeCount",value:function(e){var t=e.target.name.split(","),n=t[0],a=e.target.value,l=t[1];if(0==a.split("")[0]){var s=a.split("");s.shift(0),a=s.join("")}this.state.list[l].bets[n].betOption.money=a,this.setState({list:this.state.list}),this.props.callback(this.state.list)}},{key:"closeBtn",value:function(e,t,n){var a=this,l=JSON.stringify({query:'mutation {\n              deleteCart(\n                token:"'+d.default.getCookie("token")+'"\n                betOption:"'+n+'"\n              ) {\n                status  #0，成功；非0，失败\n                msg\n              }\n            }'});d.default.graphQlFn({params:l},function(n){0==n.data.deleteCart.status&&(a.state.list[e].bets.splice(t,1),a.state.list[e].bets.length<1&&delete a.state.list[e],a.setState({list:a.state.list}),a.props.callback(a.state.list),d.default.carCountAnimate(0),a.props.callback(a.state.list))})}},{key:"guardian",value:function(e){var t=this,n=!1,a=0,l="mutation generateBetOrder{\n                      generateBetOrder(\n                        amount: "+e.gameTotal+',\n                        token: "'+d.default.getCookie("token")+'",\n                        orders: [';if(e.bets.forEach(function(t,s){t.select&&(a++,l+='{match: "'+e.match.id+'",\n                    bet: "'+t.bet.id+'",\n                    betOption: "'+t.betOption.id+'",\n                    amount: '+t.betOption.money+",\n                    odds: "+t.betOption.odds+"},",t.betOption.money||(n=!0))}),l+="]) {\n                    status\n                    msg\n                    betOrderID\n                  }\n                }",0==a)return void t.props.setMsg("请选择需要守护的选项");if(n)return void t.props.setMsg("请输入竞币");var s=JSON.stringify({query:l});return void d.default.graphQlFn({params:s,url:"/graphql"},function(e){var n=e.data.generateBetOrder;0==n.status?window.location.href="share-order.html?me=1&guardian=1&betOrderID="+n.betOrderID+"&user="+d.default.getCookie("uid"):t.props.setMsg(n.msg)})}},{key:"closeAlert",value:function(){this.setState({alertShow:!1})}},{key:"selectFn",value:function(e,t,n){var a=this.state.list;if(1==e&&(a[t].select?(a[t].select=!1,a[t].bets.forEach(function(e,t){e.select=!1})):(a[t].select=!0,a[t].bets.forEach(function(e,t){e.select=!0}))),2==e){var l=a[t].bets.length,s=0;a[t].bets.forEach(function(e,t){t==n&&(e.select?e.select=!1:e.select=!0),e.select&&s++}),a[t].select=l==s}this.setState({list:a}),this.props.callback(a)}},{key:"render",value:function(){var e=this,t=[],n=this.state.list;for(var a in n)!function(a){var l=[],s=n[a],r=0;s.bets.map(function(t,n){var s="全场";0!=t.bet.BONumber&&(s="第"+t.bet.BONumber+"局"),r+=Number(t.money),l.push(c.default.createElement("div",{className:"list",key:n},c.default.createElement("div",{className:"select "+(t.select?"select-active":""),onClick:e.selectFn.bind(e,2,a,n)}),c.default.createElement("div",{className:"close",onClick:e.closeBtn.bind(e,a,n,t.betOption.id)}),c.default.createElement("div",{className:"name"},"【",s,"】",t.bet.shortName),c.default.createElement("div",{className:"gameWin"},t.betOption.title,"胜"),c.default.createElement("div",{className:"profit"},c.default.createElement("div",null,c.default.createElement("div",{className:"input"},c.default.createElement("div",{className:"gold-icon"}),c.default.createElement("input",{value:t.betOption.money,name:n+","+a,onChange:e.onChangeCount.bind(e),type:"number"}))),c.default.createElement("div",{className:"text-center"},"x",t.betOption.odds),c.default.createElement("div",null,c.default.createElement("div",{className:"input-get"},c.default.createElement("div",{className:"gold-icon"}),c.default.createElement("div",{className:"get"},parseInt(t.betOption.money*t.betOption.odds*100)/100))),c.default.createElement("div",{className:"color"},"竞猜金额"),c.default.createElement("div",{className:"text-center color"},"收益率"),c.default.createElement("div",{className:"text-right color"},"预计收益"))))}),t.push(c.default.createElement("div",{className:"aGame",key:a},c.default.createElement("div",{className:"game-detail"},c.default.createElement("div",{className:"select "+(s.select?"select-active":""),onClick:e.selectFn.bind(e,1,a)}),c.default.createElement("div",{className:"logo"},c.default.createElement("img",{src:s.match.leftTeam.logo,alt:""}),"vs",c.default.createElement("img",{src:s.match.rightTeam.logo,alt:""})),c.default.createElement("span",null,s.match.game.name),c.default.createElement("div",{className:"time"},d.default.getTimeAll(s.startTime))),l,c.default.createElement("div",{className:"guardian"},c.default.createElement("div",null,c.default.createElement("div",{className:"gold-icon"}),c.default.createElement("div",{className:"aGame-total"},s.gameTotal||0)))))}(a);return c.default.createElement("div",{className:"settlementList"},c.default.createElement("div",{className:"alert-layer "+(this.state.alertShow?"alert-layer-show":""),onClick:this.closeAlert},"wx"==this.state.alertText?c.default.createElement("img",{src:p.default,alt:""}):this.state.alertText),t)}}]),t}(c.default.Component),v=function(e){function t(e){l(this,t);var n=s(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));n.state={myList:n.props.list,total:0,totalBets:0,totalExpect:0,msg:"",showChangeBtn:!1,allSelect:!1};["getMyCart","onChangeCount","getDate","clearAll","BetFn","closeAlert","selectAll","setMsg"].forEach(function(e){n[e]=n[e].bind(n)});return n}return r(t,e),o(t,[{key:"componentDidMount",value:function(){this.getMyCart()}},{key:"componentWillReceiveProps",value:function(e){this.setState({myList:e.list})}},{key:"getMyCart",value:function(){var e=this,t=JSON.stringify({query:'{\n              myCart(\n                token:"'+d.default.getCookie("token")+'"\n              ) {\n                match {\n                  id\n                  game {\n                    name\t\t\t#联赛名称\n                  }\n                  leftTeam {\t\n                    name\t\t\t#左队\n                    logo\n                  }\n                  rightTeam {\n                    name\t\t\t#右队\n                    logo\n                  }\n                  startTime\t\t#开始时间\n                }\n                bet {\n                  id\n                  name\t\t\t\t#竞猜名称\n                  BONumber\t\t#0，全场；1，第一局；2，第二局；……\n                  shortName\n                }\n                betOption {\n                  id\n                  title\t\t\t\t#竞猜选项标题\n                  odds\t\t\t\t#竞猜赔率\n                }\n              }\n            }'});d.default.graphQlFn({params:t},function(t){var n=t.data.myCart,a={};n.forEach(function(e){a[e.match.id]?a[e.match.id].bets.push({bet:e.bet,betOption:Object.assign(e.betOption,{money:0})}):a[e.match.id]={match:e.match,bets:[{bet:e.bet,betOption:Object.assign(e.betOption,{money:0})}]}}),e.setState({myList:a})})}},{key:"onChangeCount",value:function(e){var t=e.target.value;this.setState({total:t})}},{key:"getDate",value:function(e){var t=0;for(var n in e){var a=0;e[n].bets.forEach(function(e,n){e.select&&(a+=Number(e.betOption.money),t+=Number(e.betOption.money))}),e[n].gameTotal=a}this.setState({myList:e,totalBets:0,total:t,totalExpect:0}),this.setState({myList:e})}},{key:"clearAll",value:function(){var e=this,t=JSON.stringify({query:'mutation {\n                  clearCart(\n                    token:"'+d.default.getCookie("token")+'"\n                  ) {\n                    status  #0，成功；非0，失败\n                    msg\n                  }\n                }'});d.default.graphQlFn({params:t},function(t){0==t.data.clearCart.status&&e.setState({myList:{}})}),d.default.carCountAnimate(0,0)}},{key:"BetFn",value:function(e){var t=this;if(!d.default.getCookie("token"))return void this.setState({msg:"请登录"});var n=this,a=this.state.myList,l=!1,s=!0;for(var r in a)a[r].bets.forEach(function(e,t){e.select&&(s=!1,e.betOption.money||(l=!0))});if(s)return void n.setState({msg:"请至少选择一个赛事"});if(l)return void n.setState({msg:"请输入竞币"});var o='mutation generateAndPayBetOrder{\n                             generateAndPayBetOrder(\n                             token: "'+d.default.getCookie("token")+'",  #用户token\n                             amount:'+this.state.total+",\t\t\t\t#下注总金额\n                             orders: [";for(var i in a)!function(e){var t=a[e];t.bets.forEach(function(e){e.select&&(o+='{\n                        match:"'+t.match.id+'",\n                        bet:"'+e.bet.id+'",\n                        betOption:"'+e.betOption.id+'",\n                        amount:'+e.betOption.money+",\n                        odds:"+e.betOption.odds+",\n                        },")})}(i);o+="]) {\n                        status\n                        msg\n                        betOrderID\t\t\t#下注订单ID\n                      }\n                    }",e&&(o=o.replace(/generateAndPayBetOrder/g,"generateBetOrder"));var c=JSON.stringify({query:o});d.default.graphQlFn({params:c,url:"/graphql"},function(n){if(e){var a=n.data.generateBetOrder;0==a.status?window.location.href="share-order.html?me=1&guardian=1&betOrderID="+a.betOrderID+"&user="+d.default.getCookie("uid"):t.setMsg(a.msg)}else{var l=n.data.generateAndPayBetOrder;0==l.status?(t.getMyCart(),t.setMsg("下注成功"),window.location.href="share-order.html?me=1&betOrderID="+l.betOrderID+"&user="+d.default.getCookie("uid")):t.setMsg(l.msg)}})}},{key:"detailSaveLocalStorage",value:function(e){window.localStorage.setItem("tickDetail",JSON.stringify(e))}},{key:"setMsg",value:function(e){this.setState({msg:e})}},{key:"closeAlert",value:function(){this.setState({msg:""})}},{key:"selectAll",value:function(){var e=this.state.myList;if(this.state.allSelect)for(var t in e)e[t].select=!1,e[t].bets.forEach(function(e,t){e.select=!1});else for(var n in e)e[n].select=!0,e[n].bets.forEach(function(e,t){e.select=!0});this.setState({allSelect:!this.state.allSelect,myList:e}),this.getDate(e)}},{key:"render",value:function(){var e=this;return c.default.createElement("div",{className:"settlement"},c.default.createElement(f.default,{close:this.closeAlert,msg:this.state.msg}),c.default.createElement(g,{callback:this.getDate,setMsg:this.setMsg,list:this.state.myList}),c.default.createElement("div",{className:"Total"},c.default.createElement("div",{className:"handle"},c.default.createElement("div",{className:"all-select"},c.default.createElement("div",{className:"select "+(this.state.allSelect?"select-active":""),onClick:this.selectAll}),"全选"),c.default.createElement("div",{className:"btn",onClick:this.BetFn},"马上投注"),c.default.createElement("div",{className:"all"},c.default.createElement("div",{className:"gold-icon"}),c.default.createElement("div",{className:"aGame-total"},this.state.total)),c.default.createElement("div",null,"合计：")),c.default.createElement("div",{className:"clear-go"},c.default.createElement("div",{className:"clear",onClick:this.clearAll},"清空"),c.default.createElement("div",{className:"friendPay",onClick:function(){e.BetFn(1)}},"好友代付"),c.default.createElement("a",{href:"recharge.html"},c.default.createElement("div",{className:"btn",onClick:this.BetFn},"竞币不足?",c.default.createElement("span",null,"获取竞币>>"))))))}}]),t}(c.default.Component);t.default=v},687:function(e,t,n){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),o=n(14),i=function(e){return e&&e.__esModule?e:{default:e}}(o);n(688);var c=function(e){function t(e){a(this,t);var n=l(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={content:n.props.msg},["close"].forEach(function(e){n[e]=n[e].bind(n)}),n}return s(t,e),r(t,[{key:"componentWillReceiveProps",value:function(e){this.setState({content:e.msg})}},{key:"close",value:function(){this.props.close()}},{key:"render",value:function(){return i.default.createElement("div",{className:"myAlert "+(this.state.content?"myAlert-show":"")},i.default.createElement("div",{className:"content"},this.state.content,i.default.createElement("div",{className:"close-btn",onClick:this.close},"关闭")))}}]),t}(o.Component);t.default=c},688:function(e,t,n){var a=n(689);"string"==typeof a&&(a=[[e.i,a,""]]);var l={};l.transform=void 0;n(605)(a,l);a.locals&&(e.exports=a.locals)},689:function(e,t,n){t=e.exports=n(604)(!0),t.push([e.i,".myAlert{height:100%;width:100%;background:rgba(0,0,0,.3);position:fixed;z-index:100;display:none;text-align:center;top:0;left:0;color:#000}.myAlert .content{padding:.26667rem;width:6.66667rem;background:#fff;line-height:1.33333rem;margin:4.66667rem auto;border-radius:.13333rem;font-size:.45333rem}.myAlert .content .close-btn{height:.66667rem;line-height:.66667rem;border-top:1px solid #eee;padding-top:.26667rem}.myAlert-show{display:block}","",{version:3,sources:["/Users/wxq/Desktop/myTool/testTool/src/components/myAlert/index.scss"],names:[],mappings:"AAGA,SACE,YAAY,AACZ,WAAW,AACX,0BAA2B,AAC3B,eAAe,AACf,YAAY,AACZ,aAAa,AACb,kBAAkB,AAClB,MAAM,AACN,OAAO,AACP,UAAY,CAiBb,AA3BD,kBAYI,kBAduB,AAevB,iBAfuB,AAgBvB,gBAAiB,AACjB,uBAjBuB,AAkBvB,uBAAqB,AACrB,wBAnBuB,AAoBvB,mBApBuB,CA2BxB,AAzBH,6BAoBM,iBAtBqB,AAuBrB,sBAvBqB,AAwBrB,0BAA0B,AAC1B,qBAzBqB,CA0BtB,AAIL,cACE,aAAc,CACf",file:"index.scss",sourcesContent:["@function Rem($now) {\n  @return ($now / 75) + rem;\n}\n.myAlert{\n  height: 100%;\n  width: 100%;\n  background: rgba(0,0,0,0.3);\n  position: fixed;\n  z-index: 100;\n  display: none;\n  text-align: center;\n  top: 0;\n  left: 0;\n  color: black;\n  .content{\n    padding: Rem(20);\n    width: Rem(500);\n    background: white;\n    line-height: Rem(100);\n    margin: Rem(350) auto;\n    border-radius: Rem(10);\n    font-size: Rem(34);\n    .close-btn{\n      height: Rem(50);\n      line-height: Rem(50);\n      border-top: 1px solid #eee;\n      padding-top: Rem(20);\n    }\n  }\n\n}\n.myAlert-show{\n  display: block;\n}"],sourceRoot:""}])},690:function(e,t,n){e.exports=n.p+"image/shareImg.png"}});