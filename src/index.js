import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

// Importing the fetch polyfill allows cypress to intercept fetch api requests.
import 'whatwg-fetch';
// Change me if you prefer sass,scss, less. (Note you may need to update the build config)
import './index.css';
import App from './components/App';

ReactDOM.render(
  <BrowserRouter>
  <App />
  </BrowserRouter>,
   document.getElementById('root'));

// Hot Module Replacement
if (module.hot) {
  module.hot.accept();
}
