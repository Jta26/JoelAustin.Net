import React from 'react';
import ReactDOM from 'react-dom';
import { Router, HashRouter } from 'react-router-dom';
import './css/index.css';
import App from './App';
import ReactGA from 'react-ga';
import history from './history';
import * as serviceWorker from './serviceWorker';

console.log('GA initialized');
ReactGA.initialize('UA-136074176-1');

ReactDOM.render(
    <Router history={history} >
        <App />
    </Router>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
