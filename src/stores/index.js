/**
 * Created by wxq on 2017/8/22.
 */
import { createStore } from 'redux';
import rootReducer from '../reducers/index';

export default function configureStore(initialState) {
    const store = createStore(rootReducer, initialState);
    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers/index', () => {
            const nextRootReducer = require('../reducers/index');
            store.replaceReducer(nextRootReducer);
        });
    }
    return store;
}