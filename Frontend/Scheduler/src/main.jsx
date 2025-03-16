import { Component, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { DataProvider } from "./data/data.jsx";

import './App.css'
import App from './App.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DataProvider>
      <App />
    </DataProvider>
  </StrictMode>
)
