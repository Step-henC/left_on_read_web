import type { Metadata } from "next";
import {Toaster} from 'react-hot-toast'
import Provider from '@/lib/Provider'

import "./globals.css";

export const metadata: Metadata = {
  title: "Left On Read",
  description: "Engage with your books using AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider>

   
    <html lang="en">
      <body >
        <Toaster />
        {children}
      </body>
    </html>
    </Provider>
  );
}
