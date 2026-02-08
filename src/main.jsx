import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './Routes/router.jsx'
import AuthProvider from './contexts/AuthContext/AuthProvider.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify';




const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
     <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer/>
     </AuthProvider> 
    </QueryClientProvider>
  </StrictMode>,
)
