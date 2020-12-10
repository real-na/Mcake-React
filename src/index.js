import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {HashRouter,BrowserRouter} from 'react-router-dom';

import './assets/iconfont/iconfont.css';
const Router = process.env.NODE_ENV === 'development'?HashRouter:BrowserRouter;

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);

