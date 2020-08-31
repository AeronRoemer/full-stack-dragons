import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import Root from './components/Root'
import './index.css';
import { fetchAuthenticated } from './actions/account';

//imports and exports are different for browser app. 
//node uses Common Js with import/exports
//browser uses ECMA Script standard
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, /* preloadedState, */ composeEnhancers(
    applyMiddleware(thunk)
    ));
//only renders when fetchAuthenticated() is complete 
store.dispatch(fetchAuthenticated())
    .then(() => {
        console.log('rendering jsx')
        render(
            <Provider store={ store }>
                <h1>Rendering from index</h1>
                <Root />
            </Provider>,
            document.getElementById('root')
        )
    })