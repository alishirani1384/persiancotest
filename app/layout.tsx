import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const yekanFont = localFont({
  src: "./fonts/regular.woff",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="rtl">
      <body
        className={`${yekanFont.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
