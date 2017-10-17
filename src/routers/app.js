import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link
} from 'react-router-dom'
//import createBrowserHistory from 'history/createBrowserHistory';
//const hashHistory = createBrowserHistory();
import AppComp from '../page/app/app.js';
import shopCart from '../page/shopCart/shopCart.js';
import share from '../page/share/share.js';
import page from '../page/pageIndex/pageindex.js';
class App extends Component {
    render() {
        return (
                <Router  basename="/">
                        <Switch>
                            <Route exact path="/" component={AppComp}/>
                            <Route path="/shopCart" component={shopCart}/>
                            <Route path="/share" component={share}/>
                            <Route path="/page" component={page}/>
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