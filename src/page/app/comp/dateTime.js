/**
 * Created by wxq on 2017/7/11.
 */
import React from 'react';
import util from '../../../utils/myMomen'
import DownAlert from '../../../components/downAlert/downAlert'
class DateTime extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list:[],
            showDownAlert:false
        };
        //处理绑定方法
        var bind = [
            'clickTime',
            'getRecharge','showAlert'
        ];
        bind.forEach(func=>{
            this[func] = this[func].bind(this);
        })
    }
    componentWillMount() {
        this.getList()
    }
    render(){
        let list = [];
        this.state.list.map((v,i)=>{
            let isTwoText = false;
            if(i>1&&i<5){
                isTwoText = true;
            }
            list.push(
                <div
                    key={i}
                    className={"nav-btn " + (isTwoText?'two-text ':'') + (v.active?'active':'')}
                    onClick={this.clickTime.bind(this,v)}
                >
                    {v.name}
                </div>
            )
        });
        return (
            <div className="timeNav">
                <div className="icon-btn left-btn" onClick={this.showAlert}></div>
                <div className="icon-btn right-btn" onClick={this.showAlert}></div>
                <div className="nav">
                    {list}
                </div>
                <DownAlert closeFn={this.getRecharge} show={this.state.showDownAlert}/>
            </div>
        )
    }
    getList(){
        let dateList = [];
        let oneDay = 86400;
        let nowDate = parseInt(new Date()/1000);
        dateList[0] = {name:util.getTimeMMDD(nowDate-oneDay*3),date:util.getTime(nowDate-oneDay*3)};
        dateList[1] = {name:util.getTimeMMDD(nowDate-oneDay*2),date:util.getTime(nowDate-oneDay*2)};
        dateList[2] = {name:'昨天',date:util.getTime(nowDate-oneDay)};
        dateList[3] = {name:'今天',date:util.getTime(nowDate),active:true};
        dateList[4] = {name:'明天',date:util.getTime(nowDate+oneDay)};
        dateList[5] = {name:util.getTimeMMDD(nowDate+oneDay*2),date:util.getTime(nowDate+oneDay*2)};
        dateList[6] = {name:util.getTimeMMDD(nowDate+oneDay*3),date:util.getTime(nowDate+oneDay*3)};
        this.setState({'list': dateList});
    }
    clickTime(obj){
        let me = this;
        me.state.list.forEach((v)=>{
            v['active'] = false;
            if(v.name == obj.name){
                v['active'] = true;
                me.props.setTime(v.date)
            }
        });
        me.setState({'list': me.state.list});

    }
    getRecharge(){
        this.setState({'showDownAlert': false});
    }
    showAlert(){
        this.setState({'showDownAlert': true});
    }

}
export default DateTime;