import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import * as Toast from "@radix-ui/react-toast";
import './index.css'
import { App } from './app.tsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toast.Provider swipeDirection="right" duration={2500}>
        <App />
      </Toast.Provider>
    </QueryClientProvider>
  </StrictMode>,
)
