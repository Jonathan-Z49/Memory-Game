import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import Footer from './components/Footer';
import { Header } from './components/Header';

ReactDOM.render(
  <React.StrictMode>
    <Header />
    <App />
    <Footer />
  </React.StrictMode>,
  document.getElementById('root'),
);
