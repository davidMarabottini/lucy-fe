import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Auth0Provider } from "@auth0/auth0-react";
import './config/i18n';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Auth0Provider
      domain="localhost:5173"
      clientId="CLIENT_ID"
      authorizationParams={{
        audience: "localhost:5000",
        scope: "predict:sms predict:mail"
      }}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <App />
      </Suspense>
    </Auth0Provider>
  </StrictMode>,
)
