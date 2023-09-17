"use client";

import Header from '@/components/Header';
import './globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AccountProvider from '@/context/AccountContext';
import Footer from '@/components/Footer';
import ShipsProvider from '@/context/ShipsContext';

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
        <AccountProvider>
            <QueryClientProvider client={queryClient}>
              <Header/>
              <main className="max-w-7xl mx-auto min-h-[80vh]">
                <ShipsProvider>
                {children}
                </ShipsProvider>
              </main>
              <Footer/>
            </QueryClientProvider>
        </AccountProvider>
      </body>
    </html>
  )
}
