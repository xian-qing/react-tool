/**
 * Created by stone on 2017/6/17.
 */
import React from 'react'
import './index.scss'
import arrow from '../../image/arrow.png'
import util from '../../utils/myMomen'
class HomeNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            homeNavList: [
                /*{
                    id: '',
                    name: '推荐',
                    active:true
                }*/
            ],
            showLis:[],
            listShowAll:false,
            isTop:this.props.top
        };

        //处理绑定方法
        var bind = [
            'arrowClick',
            'clickNavBtn'
        ]
        bind.forEach(func=>{
            this[func] = this[func].bind(this);
        })
    }
    componentWillMount() {
        var me = this;
        let params = JSON.stringify({
            query:'{gameCategorys(offset:0,limit: 20){id,name}}'
        })
        util.graphQlFn({params:params},res=>{
            let navList = res.data.gameCategorys;
            //navList[0]['active'] = true;
            me.setState({
                'homeNavList': me.state.homeNavList.concat(navList)
            })
            me.clickNavBtn(navList[0].id)
        })
        //this.setState({homeNavList: homeNavList})
    }
    arrowClick(){
        this.setState({listShowAll:!this.state.listShowAll})
    }
    clickNavBtn(id){
        this.state.homeNavList.forEach((v)=>{
            v.active = false;
            if(v.id== id){
                v.active = true
            }
        })
        this.setState({homeNavList:this.state.homeNavList});
        this.props.clickNav(id)
    }
    componentWillReceiveProps(nextProps){
        this.setState({'isTop':nextProps.top})
    }
    render(){
        var divList = []
        //处理首页导航
        this.state.homeNavList.map((v,idx)=>{
            if(idx>=5&&!this.state.listShowAll){
                return
            }
            var activeBtn = 'nav-btn'
            if(v.active){
                activeBtn = 'nav-btn active-nav'
            }
            divList.push(
                <div
                key={v.id}
                className={activeBtn}
                onClick={this.clickNavBtn.bind(this,v.id)}>
                {v.name}
                </div>
            )
        })

        //处理导航收缩
        var arrowClass = 'arrow'
        if(this.state.listShowAll){
            arrowClass = 'arrow arrow-top'
        }
        return (
            <div className={'HomeNav '+(this.state.isTop?'HomeNavTop':'')}>
                <div className="nav-btn-box">
                    {divList}
                </div>
                <img onClick={this.arrowClick}  className={arrowClass} src={arrow} alt=""/>
            </div>
        )
    }

}
export default HomeNav;