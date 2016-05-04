import React = require('react');
import ReactDOM = require('react-dom');
import { Provider } from 'react-redux';
import Redux = require('redux');
// import ReactRedux = require('react-redux');


import App from './App';
import reducers from './reducers';

ReactDOM.render(
    <Provider store={Redux.createStore(reducers)}>
        <App />
    </Provider>
    , document.getElementById('root'));
