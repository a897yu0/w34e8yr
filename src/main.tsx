import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const stricted: boolean = true;
// const stricted: boolean = false;  // Strict mode renders components twice on development to detect errors in your code.

createRoot(document.getElementById('root')!).render(
  stricted ? <StrictMode><App /></StrictMode> : <App />,
);