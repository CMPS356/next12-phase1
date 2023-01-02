'use client';

import './globals.css'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <head />
      <QueryClientProvider client={queryClient}>
        <body>
          {children}
        </body>
      </QueryClientProvider>
    </html>
  )
}
