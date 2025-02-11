"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { UserContextProvider } from "@/contexts/userContext";
import DashboardLayout from "@/components/Dashboard";
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
            className={`${geistSans.variable} ${geistMono.variable} antialiased font-[family-name:var(--font-geist-sans)]`}
          >
            <ToastContainer />
            <DashboardLayout>{children}</DashboardLayout>
          </body>
        </html>
      </UserContextProvider>
    </QueryClientProvider>
  );
}
