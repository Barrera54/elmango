
import { createRoot } from 'react-dom/client';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { Theme } from "@radix-ui/themes";
const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Theme>
      <App />
    </Theme>
    </BrowserRouter>
  </React.StrictMode>
);