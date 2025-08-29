import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { MovieContextProvider } from './context/MovieContext.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
      <MovieContextProvider>
          <BrowserRouter>
              <App />
          </BrowserRouter>
      </MovieContextProvider>
    
  // </StrictMode>,
)
