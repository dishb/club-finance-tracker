import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Club Finance Tracker",
  description: "Created by Dishant Bhandula and Samanyu Kulkarni.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <div className="font-[family-name:var(--font-inter)]">
          <div className="flex flex-col min-h-screen">
            {/* Navbar goes here */}
            <main className="flex-1 flex flex-col">{children}</main>
          </div>
          {/* Footer goes here */}
        </div>
      </body>
    </html>
  );
}
