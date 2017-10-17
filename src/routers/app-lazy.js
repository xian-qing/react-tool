import React, { Component} from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link
} from 'react-router-dom'
import '../index.scss'
//import createBrowserHistory from 'history/createBrowserHistory';
//const hashHistory = createBrowserHistory();
/*//页面索引
 import pageContainer from 'bundle-loader?lazy&name=page/h5-[name]!../page/pageIndex/pageindex';
 export const BundlePage= () => (
 <Bundle load={pageContainer}>
 {(BundlePage) => <BundlePage />}
 </Bundle>
 )*/

import Bundle from '../components/bundle.js';
// 异步引入
import app from '../page/app/app.js'
import shopCart from '../page/shopCart/shopCart.js'
import share from '../page/share/share.js'
import page from '../page/pageIndex/pageindex.js'
import login from '../page/login/login.js'
 let routers = {
     app: app,
     shopCart: shopCart,
     share: share,
     page:page,
     login:login
 }


if(process.env.NODE_ENV!='production'){}

class App extends Component {
    constructor() {
        super()
    }
    render() {
        let showRouters = []
        for(let r in routers){
            let comp = routers[r]
            let path = r != 'app'?'/'+r:'/'

            showRouters.push(
                <Route key={r} exact={r=='app'?true:false}  path={path} component={() => {
                    return(
                        <Bundle load={comp}>
                            {Component => <Component />}
                        </Bundle>
                    )
                }}/>
            )
        }
        return (
                <Router  basename="/">
                        <Switch>
                            {showRouters}
                            {/*<Route exact path="/" component={AAA}/>*/}
                            {/*<Route path="/shopCart" component={BundleShopCart}/>
                            <Route path="/share" component={BundleShare}/>
                            <Route path="/page" component={BundlePage}/>*/}
                            <Route component={NoMatch}/>
                        </Switch>
                </Router>
        )
    }
}

//404情况
const NoMatch = ({ location }) => (
    <div>
        <h3>未找到<code>{location.pathname}</code></h3>
    </div>
)
export default App