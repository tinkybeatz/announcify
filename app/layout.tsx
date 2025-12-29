import type { Metadata } from "next";
import { SessionProviderWrapper } from "@/components/providers/SessionProviderWrapper";
import { auth } from "@/auth";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "🎁 announcify",
    template: "%s | announcify",
  },
  description: "Create instant celebratory microsites from a simple form.",
  icons: {
    icon: "/icon.svg",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Zalando+Sans:wght@400;500;600;700&family=Zalando+Sans+Expanded:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        <SessionProviderWrapper session={session}>
          {children}
        </SessionProviderWrapper>
      </body>
    </html>
  );
}