/**
 * Created by wxq on 2017/9/5.
 */
import React from 'react';
import util from '../../../utils/myMomen'
import jcwz from '../../../image/share/invite.png'
import linkImg  from '../../../image/share/link-img.png'
import AlertDownLoad  from '../../../components/AlertLoginDownload/index'
import './index.scss'
class Share extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            input: '',
            msg: '',
            phone: '',
            placeholder: '请输入手机号',
            codeBtn: '获取验证码',
            timer: 0,
            alertShow: false
        }
        ;['open', 'download', 'onChangeInput', 'onFocus', 'getCode', 'setMsg'].forEach(func => {
            this[func] = this[func].bind(this)
        })
    }
    componentDidMount() {
        this.getInfo()
    }
    open() {
        this.setState({ alertShow: true })
    }
    componentWillUnmount() {
        clearInterval(me.state.timer)
    }
    onChangeInput(e) {
        let value = e.target.value
        if (value.length <= 11) {
            this.setState({ input: value })
        }
    }
    onFocus() {}
    getInfo() {
        // let id = util.getArgs('consortia') || '597b217054fbd790184eb6a9'
        let id = util.getArgs('consortia')

        let params = JSON.stringify({
            query: `{
                consortia(id: "${id}") {
                    id
                    name
                    logo
                    rank
                    description
                    members {
                        id
                        name
                        avatar
                        earningOfGold
                    }
                    size
                    winRate
                    earnGold
                }
            }`
        })
        util.graphQlFn({ url: '/api/graphql', params: params }, res => {
            // console.log(res.data.consortia)
            this.setState({ user: res.data.consortia })
        })
    }
    renderOther(members) {
        if (members && members.length) {
            members.length > 3 && (members.length = 3)
            return members.map((item, i) => {
                return (
                    <div className="other-item" key={`other-${i}`}>
                        <img className="other-avatar" src={item.avatar} />
                        <p className="other-name">
                            {item.name}
                        </p>
                        <p className="gold">
                            <span>{item.earningOfGold}</span>
                            收益
                        </p>
                    </div>
                )
            })
        }
    }
    getCode() {
        let me = this
        if (me.state.codeBtn != '获取验证码') {
            return
        }
        if (this.state.input.length != 11) {
            this.setMsg('请输入正确手机号')
            return
        }
        let inputPhone = this.state.input
        if (this.state.phone) {
            inputPhone = this.state.phone
        }
        let params = JSON.stringify({
            query: `mutation {
                checkCode:checkCode(
                phone:"${inputPhone}" #电话号码 
                ){
                    status
                    msg
                }
            }`
        })
        util.graphQlFn({ params: params }, res => {
            let result = res.data.checkCode
            if (result.status == 0) {
                let phone = this.state.input
                this.setState({
                    phone: phone,
                    placeholder: '请输入验证码',
                    input: ''
                })
                this.state.timer = setInterval(r => {
                    if (me.state.codeBtn == '获取验证码') {
                        me.setState({ codeBtn: 60 })
                    } else {
                        me.state.codeBtn--
                        if (me.state.codeBtn <= 0) {
                            clearInterval(me.state.timer)
                            me.setState({ codeBtn: '获取验证码' })
                        } else {
                            me.setState({ codeBtn: me.state.codeBtn })
                        }
                    }
                }, 1000)
            } else {
                this.setMsg(result.msg)
            }
        })
    }
    setMsg(msg) {
        this.setState({ msg: msg }, r => {
            setTimeout(function() {
                this.setState({ msg: '' })
            }, 1000)
        })
    }
    download() {
        let phone = this.state.phone
        let code = this.state.input
        if (phone.length != 11) {
            this.setMsg('请输入正确手机号')
            return
        }

        let params = JSON.stringify({
            query: `mutation {
                login:login(
                    phone:"${phone}" 
                    code:"${code}" #短信验证码登录
                    ) {
                    status # 0 成功 非0 失败
                    msg
                    user{ #用户信息
                        id
                        name
                        uid
                        token
                        avatar
                    }
                }
            }`
        })
        util.graphQlFn({ params: params }, res => {
            let result = res.data.login
            if (result.status == 0) {
                util.setCookie('token', result.user.token)
                util.setCookie('uid', result.user.uid)
                window.location.href = 'http://a.app1.qq.com/o/simple.jsp?pkgname=com.jgg.games&from=singlemessage'
            } else {
                this.setMsg(result.msg)
            }
        })
    }
    render() {
        let user = this.state.user
        let showAlert = this.state.alertShow ? <AlertDownLoad/> : ''
        let rank = String(user.rank)
        let rankLen = rank.length
        return (
            <div className="share-box">
                <div className="link-img">
                    <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.jgg.games&from=singlemessage"><img src={linkImg}  alt=""/></a>
                </div>
                <div className="share-detail">
                    <div className="avatar">
                        <div className="img">
                            <img src={user.logo} alt="" />
                        </div>
                    </div>
                    <div className="user-name">
                        {user.name}
                    </div>
                    <img className="jcwz" src={jcwz} alt="" />
                    <div className="detail">
                        <div className="win">
                            <span className="title">排名</span>
                            <div className="num">
                                {rank[rankLen - 3] || 0}
                            </div>
                            <div className="num">
                                {rank[rankLen - 2] || 0}
                            </div>
                            <div className="num">
                                {rank[rankLen - 1] || 0}
                            </div>
                        </div>
                        <div className="show-box fl">
                            <div className="info fl">
                                {user.earnGold}
                            </div>
                            <div className="name fl">收益</div>
                        </div>
                        <div className="show-box fr">
                            <div className="info fl">
                                {user.size}
                            </div>
                            <div className="name fl">人</div>
                        </div>
                        {/* <div className="show-box fl">
                         <div className="info fl">
                         {user.size}
                         </div>
                         <div className="name fl">场</div>
                         </div> */}
                        <div className="show-box fr cer">
                            <div className="info fl">
                                {user.winRate}%
                            </div>
                            <div className="name fl">胜率</div>
                        </div>
                    </div>
                    <p className="content-tit">这些小伙伴也很给力</p>
                    <div className="hr" />
                    <div className="other">
                        {this.renderOther(user.members)}
                    </div>
                    <div className="downLoad">
                        <div className="btn" onClick={this.open}>
                            下载APP并领取礼包
                        </div>
                    </div>
                    {showAlert}
                </div>

            </div>
        )
    }
}
export default Share

