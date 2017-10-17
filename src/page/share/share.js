/**
 * Created by wxq on 2017/9/5.
 */
import React  from 'react';
import PropTypes from 'prop-types'
import {
    Route,
} from 'react-router-dom'
import { connect } from 'react-redux'
import { LoginOut} from '../../action/global'
import {Link} from 'react-router-dom'
import User from 'components/user/user'
class Share extends React.Component {
    render(){
        let userObj = this.props.global
        let list = []
        userObj.list.forEach((v,i)=>{
            list.push(
                <div key={i}>
                    {v.list}
                </div>
            )
        })
        console.log(112)
        return (
            <div className="" id="share" >
                <User/>
                分享11
                <div onClick={()=>{
                    this.props.dispatch(LoginOut())
                }}>退出登录</div>
                <Link to="/">返回</Link>
                {userObj.user?userObj.user.name:''}
                {list}
                <a  href="http://oojkshyz1.bkt.clouddn.com/djdh_1.4.3_9_201709151846_legu_59b8cefb711d5a194433c39b_signed_zipalign.apk">下载</a>
            </div>
        )
    }
}
Share.PropTypes = {
    global:PropTypes.Object
}

function user(state) {
    return {
        global:state.global
    }
}
export default connect(user)(Share);
