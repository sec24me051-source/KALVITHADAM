import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AccessibilityProvider } from './context/AccessibilityContext';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AccessibilityProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </AccessibilityProvider>
    </BrowserRouter>
  </React.StrictMode>
);
