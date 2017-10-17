/**
 * Created by wxq on 2017/9/5.
 */
import React from 'react';
import shareBg  from '../../../image/share/share-app.png'
import './index.scss'
class Share extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            alertShow:false
        }
    }
    open(){
        this.setState({ alertShow:true})
    }
    render(){
        return (
            <div className="share-app">
                <img src={shareBg} alt=""/>
                <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.jgg.games&from=singlemessage"><div className="btn">立即下载</div></a>
            </div>
        )
    }
}
export default Share

