"use client";
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import './globals.css';
import React from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#1A1D29] text-white min-h-screen`}>
        <header className="fixed top-0 w-full z-50 bg-[#1A1D29] py-4 px-6 border-b border-gray-800">
          <div className="container mx-auto flex items-center gap-4">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              MovieFlix
            </h1>
          </div>
        </header>
        <main className="pt-20">
          <Providers>
            {children}
          </Providers>
        </main>
      </body>
    </html>
  );
}
