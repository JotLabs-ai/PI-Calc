import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Personal Injury Calculator | Browne Law Group",
  description: "Calculate your potential personal injury settlement with our free, accurate calculator. Get instant estimates for car accidents and other injury claims.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
