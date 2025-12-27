import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import './index.css'
import { registerSW } from 'virtual:pwa-register'

// Native Scroll restored for performance

// Register PWA Service Worker
// Register PWA Service Worker (Force Immediate Update)
const updateSW = registerSW({
  onNeedRefresh() {
    updateSW(true); // Auto-reload without asking
  },
  onOfflineReady() {
    console.log('App ready to work offline');
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
