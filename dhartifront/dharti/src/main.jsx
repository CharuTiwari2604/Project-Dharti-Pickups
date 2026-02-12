import './index.css';
axios.defaults.withCredentials = true;
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import axios from './api/axiosConfig';

ReactDOM.createRoot(
  document.getElementById('root')
).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
