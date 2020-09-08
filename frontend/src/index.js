import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { fetchAuthenticated } from './actions/account';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import Root from './components/Root'
import AccountDragons from './components/AccountDragons';
import './index.css';
//imports and exports are different for browser app. 
//node uses Common Js with import/exports
//browser uses ECMA Script standard

const history = createBrowserHistory();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, /* preloadedState, */ composeEnhancers(
    applyMiddleware(thunk)
    ));

const AuthRoute = props => {
    if (!store.getState().account){
        return <Redirect to={{pathname: '/'}} />
    }
        
    const { component, path } = props;
    return <Route path={path} component={component} />
}
//only renders when fetchAuthenticated() is complete 
store.dispatch(fetchAuthenticated())
    .then(() => {
        console.log(store.getState().account.loggedIn)
        render(
            <Provider store={ store }>
                <Router history={history}>
                    <Switch>
                        <Route exact path='/' component={Root}/>
                        <AuthRoute path='/account-dragons' component={AccountDragons}/>
                    </Switch>
                </Router>
            </Provider>,
            document.getElementById('root')
        )
    })