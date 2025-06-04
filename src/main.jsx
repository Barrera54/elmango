
import { createRoot } from 'react-dom/client';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter basename='/elmango'>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);