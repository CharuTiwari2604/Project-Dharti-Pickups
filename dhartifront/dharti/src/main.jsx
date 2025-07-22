import './index.css';
// import axios from 'axios';
axios.defaults.withCredentials = true;
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import axios from './api/axiosConfig';

import { AuthProvider } from './frontpage/AuthContext';

ReactDOM.createRoot(
  document.getElementById('root')
).render(
  <BrowserRouter>
  <AuthProvider> 
    <App />
     </AuthProvider>
  </BrowserRouter>
);
