import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ReduxProvider from "./providers/ReduxProviders";
import { Toaster } from "sonner";

export const runtime = "nodejs"

const gothamPro = localFont({
  src: [
    { path: "../public/fonts/GothamPro.ttf", weight: "400", style: "normal" },
    { path: "../public/fonts/GothamPro-Medium.ttf", weight: "500", style: "normal" },
    { path: "../public/fonts/GothamPro-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-gotham-pro",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The PM Society (TPMS) - PMP Training & Mentorship",
  description:
    "Empowering you to lead with confidence through PMP training and mentorship.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={gothamPro.variable} suppressHydrationWarning>
      <body className={`${gothamPro.className} antialiased bg-[#ECE8E1]`}>
     
          <ReduxProvider>{children}</ReduxProvider>
          <Toaster />
      
      </body>
    </html>
  );
}
