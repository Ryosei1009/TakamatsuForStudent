import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter } from 'react-router-dom'
import { Analytics } from "@vercel/analytics/react"

const root = createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH0_DOMAIN}
    clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
    cacheLocation='localstorage'
  >
    <BrowserRouter>
      <App />
      <Analytics />
    </BrowserRouter>
  </Auth0Provider>
);
