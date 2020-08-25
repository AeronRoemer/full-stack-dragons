import React from 'react';
import { render } from 'react-dom';
import Generation  from './components/Generation'
//imports and exports are different for browser app. 
//node uses Common Js with import/exports
//browser uses ECMA Script standard

render(
    <div>
        <h2>Generation from React</h2>
        <Generation />
    </div>,
    document.getElementById('root')
)