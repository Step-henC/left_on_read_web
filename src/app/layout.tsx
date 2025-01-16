import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Left OnRead",
  description: "Engage with your books!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >
        {children}
      </body>
    </html>
  );
}
