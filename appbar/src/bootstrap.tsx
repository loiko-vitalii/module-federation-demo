import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { AppBar } from './AppBar';
import './global.module.css';

const rootEl = document.getElementById('root');

if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);

  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <AppBar />
      </BrowserRouter>
    </React.StrictMode>,
  );
}
