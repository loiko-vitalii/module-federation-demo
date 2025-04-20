import React from 'react';
import ReactDOM from 'react-dom/client';

import { Input, Link, Logo, Typography } from './components';
import './global.module.css';

const rootEl = document.getElementById('root');

if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);

  root.render(
    <React.StrictMode>
      <Logo />
      <Typography variant="h1">UIKit</Typography>
      <Input />
      <Link href="#">Link Test</Link>
    </React.StrictMode>,
  );
}
