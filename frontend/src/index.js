import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import Generation  from './components/Generation'
import Dragon from './components/Dragon';
import { generationReducer } from './reducers';
import { generationActionCreator } from './actions/generation';
import './index.css';
import { striped } from './assets';
//imports and exports are different for browser app. 
//node uses Common Js with import/exports
//browser uses ECMA Script standard

const store = createStore(
    generationReducer
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
//put subscribe before updates
store.subscribe(() => store.getState())

fetch('http://localhost:3000/generation')
    .then(response => response.json())
    .then(json => store.dispatch(generationActionCreator(json.generation)))

render(
    <Provider store={ store }>
        <div>
            <h2>Generation from React</h2>
            <Generation />
            <Dragon />
        </div>
    </Provider>,
    document.getElementById('root')
)