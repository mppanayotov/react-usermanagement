import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import App from './app/app';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <BrowserRouter>
      <React.Fragment>
        <CssBaseline />
        <App />
      </React.Fragment>
    </BrowserRouter>
  </StrictMode>
);
