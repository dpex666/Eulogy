import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Eulogy Writer - Create a Heartfelt Eulogy in Minutes",
  description: "Write a personal, meaningful eulogy for your loved one with the help of AI. Free to start, with premium editing tools available.",
  keywords: "eulogy writer, funeral speech, eulogy generator, write eulogy, funeral tribute",
  openGraph: {
    title: "Eulogy Writer - Create a Heartfelt Eulogy in Minutes",
    description: "Write a personal, meaningful eulogy for your loved one with the help of AI.",
    type: "website",
  },
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
