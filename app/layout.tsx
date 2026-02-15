import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "React Native Academy - Learn Mobile Development for React Developers",
  description: "Master React Native by bridging the gap from Web Components to Native Primitives. Interactive lessons, live code playground, and comprehensive curriculum from beginner to advanced.",
  keywords: ["React Native", "React", "Mobile Development", "iOS", "Android", "Expo", "Tutorial", "Learn"],
  authors: [{ name: "React Native Academy" }],
  openGraph: {
    title: "React Native Academy",
    description: "Learn Once, Write Anywhere - Master React Native with interactive lessons",
    type: "website",
  },
  formatDetection: {
    telephone: false,
    date: false,
    email: false,
    address: false,
  },
};

export const viewport = {
  themeColor: "#0a0e27",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
