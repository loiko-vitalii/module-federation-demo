import React from 'react';
import ReactDOM from 'react-dom/client';

import './global.module.css';

const rootEl = document.getElementById('root');

if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);

  root.render(
    <React.StrictMode>
      <h1>UIKit</h1>
    </React.StrictMode>,
  );
}
