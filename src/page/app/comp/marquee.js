/**
 * Created by wxq on 2017/7/3.
 */
import React from 'react';
import util from '../../../utils/myMomen'
class Marquee extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list:[],
            scrollIdx:0,
        };
        //处理绑定方法
        var bind = [

        ];
        bind.forEach(func=>{
            this[func] = this[func].bind(this);
        })
    }
    componentDidMount() {
        this.getList()

    }
    componentWillUnmount(){

    }
    render(){
        let list = [];
        this.state.list.map((v,i)=>{
            list.push(
                <a key={i} href={'postDetail.html?id='+ v.id+'&title='+v.title+'&price='+v.price + '&name='+v.author.name+ '&avatar='+encodeURIComponent(v.author.avatar)}>{v.title}</a>
            )
        });
        return (
            <div id="Box" className="marquee">
                <div id="Box1" className="marquee-list">
                    {list}
                </div>
                {/*<div id="Box2" className="marquee-list">
                    {list}
                </div>*/}
            </div>
        )
    }
    getList(){
        let that = this;
        that.state.scrollLock = false;
        let params =JSON.stringify({
            query:'{posts(isAdvertisement: true, offset: 0, limit: 20) {' +
            'id,' +
            'title,'+
            'price,'+
            'author{name,avatar}'+
            '}}'
        });
        util.graphQlFn({params:params},res=>{
            that.setState({'list':res.data.posts});
            //that.scrollMarquee()
            that.MarqueeFn()
        })
    }
    MarqueeFn(){
        setInterval(function () {
            let hei = $('.marquee').height();
            $('#Box1').animate({
                marginTop:-hei
            },500,function () {
                $(this).css({marginTop : "0",transition:'none'});
                let a = $(this).find("a")
                $('#Box1').append(a[0])
            })

            },2000)

    }
    scrollMarquee(){
        let that = this;
        setInterval(function () {
            that.state.scrollIdx++;
            let hei = $('.marquee').height();
            $('.marquee-list').css('transform','translate(0,'+(-hei*that.state.scrollIdx)+'px)');
            setTimeout(function () {
                let first = that.state.list[that.state.scrollIdx-1];
                that.state.list.push(first);
                that.setState({'list': that.state.list});
            },1000)
        },3000)
    }

}
export default Marquee;