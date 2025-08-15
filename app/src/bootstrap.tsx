import React from 'react';

import * as Sentry from '@sentry/react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { App } from './App';
import './global.module.css';

Sentry.init({
  dsn: 'https://59bf180109528bceeffada28adab6a0a@o4509849200623616.ingest.de.sentry.io/4509849238896720',
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
});

const rootEl = document.getElementById('root');

if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);

  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
        <button
          type="button"
          onClick={() => {
            throw new Error('Error');
          }}
        >
          Error Button
        </button>
      </BrowserRouter>
    </React.StrictMode>,
  );
}
