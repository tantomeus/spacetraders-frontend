"use client";

import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Header from '@/components/Header';
import AccountProvider from '@/context/AccountContext';
import Footer from '@/components/Footer';

import './globals.css';
import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1,
    }
  }
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`font-speedy relative text-stone-50 bg-stone-950`}>
        <QueryClientProvider client={queryClient}>
          <AccountProvider>
              <Header/>
              <main className="max-w-7xl mx-auto min-h-[80vh]">
                {children}
              </main>
              <Footer/>
          </AccountProvider>
        </QueryClientProvider>
        <ToastContainer theme="dark"/>
      </body>
    </html>
  )
}
