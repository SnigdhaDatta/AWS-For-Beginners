import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PixelVault — private S3 image gallery",
  description: "Upload images to a private S3 bucket and share them with signed links. Built with Next.js on AWS.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
