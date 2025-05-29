import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { AppContextProvider } from "@/context/AppContext";
import {Toaster} from "react-hot-toast";
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sandy AI",
  description: "Sandy AI is an intelligent, user-friendly chatbot designed to simulate natural conversations with a warm, approachable personality. Whether you're building a customer support assistant, personal productivity tool, or just experimenting with conversational interfaces, Sandy provides a solid foundation for AI-powered chat experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <AppContextProvider>
      <html lang="en">
        <body
          className={`${inter.className} antialiased`}
        >
          <Toaster toastOptions={
            {
              success: {style: {
              backgroundColor: "black",
              color: "white"
            }},
            error: {style: {
              backgroundColor: "black",
              color: "white"
            }}
          }
          }/>
          {children}
        </body>
      </html>
    </AppContextProvider>
    </ClerkProvider>
  );
}
