import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./_components/navbar/page";

export const metadata: Metadata = {
  title: "John Hang Rai",
  description: "Software Engineer and Data Scientist",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="unselectable">
        <Navbar />
        {children}
        </body>
    </html>
  );
}
