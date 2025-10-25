
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


  }, [])





  return (
    <html lang="en">

      <head>
        <title>UConn Course Scheduler</title>
        <link rel="icon" type="image/x-icon" href="/Standing1.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <meta name="description" content="A course scheduling tool for University of Connecticut students."></meta>
        <meta name="keywords" content="UCONN, Course, Scheduler, University of Connecticut, Classes, Schedule, Planner"></meta>
        <meta property="og:title" content="UCONN Course Scheduler"></meta>
        <meta property="og:description" content="A course scheduling tool for University of Connecticut students."></meta>
        <meta property="og:image" content="/Standing1.ico"></meta>
        <meta property="og:type" content="website"></meta>
      </head>

      <body className={`  ${geistSans.variable} ${geistMono.variable} antialiased `}>
        <DataProvider>
          {children}
        </DataProvider>
      </body>

    </html>
  );
}
