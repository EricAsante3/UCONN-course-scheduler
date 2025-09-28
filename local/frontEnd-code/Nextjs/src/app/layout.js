
"use client"
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import DataProvider from "@/data/Data";
import { useEffect } from "react";
import Head from "next/head";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({ children }) {
  useEffect(() => {
    
    const selectedTheme = localStorage.getItem("theme")

    if (selectedTheme) {
      document.body.classList.add(selectedTheme)
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.body.classList.add("dark")
    } else {
      document.body.classList.add("light")
    }




  })



  return (
    <html lang="en">

      <head>
        <title>UCONN Course Scheduler</title>
        <link rel="icon" type="image/x-icon" href="/Standing1.ico" />
      </head>

      <body className={`  ${geistSans.variable} ${geistMono.variable} antialiased `}>
        <DataProvider>
          {children}
        </DataProvider>
      </body>

    </html>
  );
}
