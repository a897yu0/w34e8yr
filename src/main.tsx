// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  // <StrictMode>  // Strict mode renders components twice on development to detect errors in your code.
    <App />
  // </StrictMode>,
);