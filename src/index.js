import React from 'react';
import ReactDOM from 'react-dom';
import './styles/main.css';
import Routes from './Routes';
import { BrowserRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<BrowserRouter><Routes /></BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
