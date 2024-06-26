import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "./navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Registration Application",
  description: "Assists in dance battle registrations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={[inter.className, 'flex', 'flex-col'].join(' ')}>
        <Navigation />
        <div className="container mx-auto flex justify-center mt-5 flex grow mb-5">
          {children}
        </div>
      </body>
    </html>
  );
}
