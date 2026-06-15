import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Enrique Matta-Rodriguez | Software Engineering Manager",
  description:
    "Professional resume of Enrique Matta-Rodriguez — Software Engineering Manager with 14+ years of experience in production engineering, team leadership, and quality-driven development.",
  openGraph: {
    title: "Enrique Matta-Rodriguez | Software Engineering Manager",
    description:
      "Software Engineering Manager with 14+ years of experience in production engineering, team leadership, and quality-driven development.",
    type: "website",
    locale: "en_US",
  },
  metadataBase: new URL("https://ematta.dev"),
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf9f7" },
    { media: "(prefers-color-scheme: dark)", color: "#0d1626" },
  ],
};

const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches)t='dark';if(t)document.documentElement.setAttribute('data-theme',t)}catch(e){}})()`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          suppressHydrationWarning
          {...{ dangerouslySetInnerHTML: { __html: themeScript } }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
