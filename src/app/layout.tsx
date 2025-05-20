import type { Metadata } from "next";
import ThemeToggle from "@/components/ThemeToggle";
import ThemeProvider from "@/components/ThemeProvider";
import { Separator } from "@/components/ui/separator";
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
          <main>
            <div className="flex flex-col min-h-screen">
              <nav className="flex flex-col">
                <div className="flex justify-between p-4 items-center">
                  <h2 className="text-xl">Club Finance Tracker</h2>
                  <ThemeToggle />
                </div>
                <Separator />
              </nav>
              <main className="flex-1 flex flex-col">{children}</main>
            </div>
          </main>
          <footer></footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
