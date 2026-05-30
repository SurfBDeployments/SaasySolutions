import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../app/ui/globals.css";
import ResponsiveAppBar from "./appbar";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Saasy Marketing",
  description: "Working for you, with you. Saasy Marketing Team is here to help you succeed with your marketing needs. We are a team of experts in the field of marketing, and we are here to help you achieve your goals. Whether you need help with social media, content marketing, or any other aspect of marketing, we are here to help. Contact us today to learn more about how we can help you succeed.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
<ResponsiveAppBar />

