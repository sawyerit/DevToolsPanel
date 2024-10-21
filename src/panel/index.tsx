import React from 'react';
import ReactDOM from 'react-dom/client';
import Panel from './Panel';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Panel />
  </React.StrictMode>
);