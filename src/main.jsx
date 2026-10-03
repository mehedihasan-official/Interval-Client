import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/Router/Router.jsx'
import AuthProvider from './providers/AuthProvider.jsx'
import { initializeSlowMode, SlowModeProvider } from './utils/slowMode.jsx' // SLOW-MODE (remove later)

initializeSlowMode() // SLOW-MODE (remove later)
createRoot(document.getElementById('root')).render(
  <StrictMode>
   <SlowModeProvider> {/* SLOW-MODE (remove later) */}
    <AuthProvider>
     <RouterProvider router={router}/>
    </AuthProvider>
   </SlowModeProvider> {/* SLOW-MODE (remove later) */}
  </StrictMode>
)
