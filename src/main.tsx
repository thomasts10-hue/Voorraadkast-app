import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { StockProvider } from './store/StockContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <StockProvider>
        <App />
      </StockProvider>
    </HashRouter>
  </StrictMode>,
)
