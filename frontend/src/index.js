import React from 'react';
import { createStore } from 'redux';
import { render } from 'react-dom';
import Generation  from './components/Generation'
import Dragon from './components/Dragon';
import './index.css';
//imports and exports are different for browser app. 
//node uses Common Js with import/exports
//browser uses ECMA Script standard
const DEFAULT_GENERATION = { generationId:'', expiration:'' }
const generationReducer = () => {
    return {
        generation: DEFAULT_GENERATION
    }
}
const store = createStore(generationReducer);
console.log('store', store)
render(
    <div>
        <h2>Generation from React</h2>
        <Generation />
        <Dragon />
    </div>,
    document.getElementById('root')
)