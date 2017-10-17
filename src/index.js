import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import AppStore from './reducers/index';
import routers from './routers/app-lazy'
import {AppContainer} from 'react-hot-loader'
//let isDev = process.env.NODE_ENV=='development'
let store = createStore(AppStore)
const render = Component => {
    ReactDom.render(
        <AppContainer>
            <Provider store={store}>
                <Component/>
            </Provider>
        </AppContainer>,
        document.getElementById('box')
    )
}


render(routers)
if (module.hot) {
    module.hot.accept(routers, () => {
        render(routers)
    })
}