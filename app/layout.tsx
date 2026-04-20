import type { Metadata } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { ReactNode } from "react";
import { Footer } from "@/components/footer";
import { CartCountProvider } from "@/lib/cartCountContext";
import { Toaster } from "@/components/ui/sonner";
import { DEFAULT_DESCRIPTION, getSiteUrl, SITE_NAME } from "@/lib/site";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  icons: {
    icon: "/vercel.svg",
  },
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: "/hero-1.jpg",
        width: 1200,
        height: 1200,
        alt: `${SITE_NAME} hero`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    images: ["/hero-1.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${roboto.variable} ${robotoMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CartCountProvider>
          <Header />
          <main className="flex-1 mx-auto w-full max-w-360 px-4 sm:px-6 lg:px-8">
            {children}
          </main>
          <Toaster />
          <Footer />
        </CartCountProvider>
      </body>
    </html>
  );
}
