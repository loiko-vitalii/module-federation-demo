import React from 'react';
import ReactDOM from 'react-dom/client';
import { Feed } from './components/Feed';
import './global.module.css';

const rootEl = document.getElementById('root');

if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);

  root.render(
    <React.StrictMode>
      <Feed />
    </React.StrictMode>,
  );
}
