import type { Metadata } from "next";
import ThemeProvider from "@/components/themeProvider";
import ThemeToggle from "@/components/themeToggle";
import "./globals.css";

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
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ThemeToggle />

          <div className="flex flex-col min-h-screen">
            {/* Navbar goes here */}
            <main className="flex-1 flex flex-col">{children}</main>
          </div>
          {/* Footer goes here */}
        </ThemeProvider>
      </body>
    </html>
  );
}
