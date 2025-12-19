import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ag Meb Quiz",
  description: "Quiz with Ag Meb products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bh-slate-950 text-black  antialiased">
        <main className="container mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}
