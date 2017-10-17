/**
 * Created by stone on 2017/6/18.
 * props
 * height
 * width
 * onScrollBottom
 * onRefresh
 *
 */
import React,{ Component }  from 'react';
import './index.scss';
class Title  extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inTop:true,
            isBottom:false,
            bottomLoadStatus:0,
            bottomLoadComplete:true,
            touchendOk:false,
            touchStartY:0,
            touchMoveY:0,
            refreshTest:{
                0:'下拉刷新',
                1:'松开刷新',
                2:'正在刷新',
                3:'刷新完毕',
            },
            refreshStatus:0
        }
    }
    componentDidMount() {
        this.refs.scrollView.addEventListener('touchstart', this.handleTouch);
        this.refs.scrollView.addEventListener('touchmove', this.handleTouch);
        this.refs.scrollView.addEventListener('touchend', this.handleTouch);
        if(this.props.onScrollBottom){
            this.refs.scrollView.addEventListener('scroll', this.handleScroll);
        }
    }
    componentWillUnmount() {

        this.refs.scrollView.removeEventListener('touchstart', this.handleTouch);
        this.refs.scrollView.removeEventListener('touchmove', this.handleTouch);
        this.refs.scrollView.removeEventListener('touchend', this.handleTouch);
        if(this.props.onScrollBottom){
            this.refs.scrollView.removeEventListener('scroll', this.handleScroll);
        }
    }
    handleScroll=()=>{
        let scrollView = this.refs.scrollView
        let scrollIn = this.refs.scrollIn
        let scrollTop = scrollView.scrollTop
        let scrollViewHeight = scrollView.offsetHeight
        let scrollInHeight = scrollIn.offsetHeight
        if(scrollTop == 0){
            this.setState({ inTop:true})
        }else {
            this.setState({ inTop:false})
        }
        if(scrollTop+scrollViewHeight>=scrollInHeight){
            this.setState({ isBottom:true})
            if(this.state.bottomLoadComplete){
                this.setState({bottomLoadComplete:false})
                this.props.onScrollBottom((type)=>{
                    this.setState({bottomLoadComplete:true,bottomLoadStatus:(type||0)})
                })
            }

        }else {
            this.setState({ isBottom:false,bottomLoadStatus:0})
        }
    }
    handleTouch =(e) =>{
        let me  = this
        if(!this.state.inTop){
            return
        }
        let type =  e.type
        if(type == 'touchstart'){
            let touchesY = e.touches[0].clientY;
            this.setState({touchStartY:touchesY, touchendOk:false,refreshStatus:0})
        }
        if(type == 'touchmove'){
            let touchesY = e.touches[0].clientY;
            let move = touchesY - this.state.touchStartY
            if(move>0){e.preventDefault()}
            if(move < 50){
                this.setState({
                    touchMoveY:move,
                    touchendOk:false
                })
            }else if(move < 150){
                this.setState({refreshStatus:1})
                this.setState({
                    touchMoveY:move,
                    touchendOk:true
                })
            }
        }
        if(type == 'touchend'){
            if(this.state.touchendOk){
                let touchesY = e.changedTouches[0].clientY;
                me.setState({
                    touchMoveY:50,
                })
                this.setState({refreshStatus:2})
                this.props.onRefresh(()=>{
                    this.setState({refreshStatus:3})
                    setTimeout(()=>{
                        me.setState({
                            touchMoveY:0,
                            touchendOk:false
                        })
                    },300)

                })
            }else {
                me.setState({
                    touchMoveY:0
                })
            }

        }

    }
    render(){
        let props = this.props
        let style = {
            height:props.height||'100px',
            width:props.width||'100%',
            //background:'#fff',
            overflow:'scroll',
        }
        let refresh = {
            transformOrigin: 'left top 0px',
            transform: `translate3d(0px, ${this.state.touchMoveY}px, 0px) scale(1)`
        }
        return (
            <div ref="scrollView" className="scroll-view" style={style} >
                <div className={"scrollIn " + (this.state.refreshStatus>=2?'scrollInRefresh':'')} ref="scrollIn"  style={refresh}>
                    <div className="refresh-text">
                        {this.state.refreshTest[this.state.refreshStatus]}
                    </div>
                    {this.props.children}
                    {!this.props.onScrollBottom?'':
                    <div className="load-more">
                        {this.state.bottomLoadStatus==2?'没有更多了哦':'正在加载更多'}
                    </div>
                    }
                </div>
            </div>
        )
    }
}

export default Title;