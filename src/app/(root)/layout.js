"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Topbar from "@/components/top-bar";
import { UserContextProvider } from "@/contexts/userContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const queeryClient = new QueryClient();
  return (
    <QueryClientProvider client={queeryClient}>
      <UserContextProvider>
        <html lang="en">
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased font-[family-name:var(--font-geist-sans)] relative `}
          >
            <ToastContainer />
            <Topbar />
            {children}
          </body>
        </html>
      </UserContextProvider>
    </QueryClientProvider>
  );
}
