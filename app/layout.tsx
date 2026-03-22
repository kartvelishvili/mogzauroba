import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/app/components/Header";
import CookieConsent from "@/app/components/CookieConsent";
import { ClientProviders } from "@/app/components/ClientProviders";
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
};

export const metadata: Metadata = {
  metadataBase: new URL("https://mogzauroba.com"),
  title: {
    default: "Mogzauroba.com — Travel Platform / სამოგზაურო პლატფორმა",
    template: "%s | Mogzauroba.com",
  },
  description:
    "Flights, hotels, tours, transfers — ავიაბილეთები, სასტუმროები, ტურები, ტრანსფერები ერთიან ძიებაში.",
  openGraph: {
    title: "Mogzauroba.com",
    description:
      "Find flights, hotels, tours, and transfers on one modern travel platform.",
    type: "website",
    locale: "ka_GE",
    alternateLocale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ka">
      <head>
        <link rel="preconnect" href="https://cdn.web-fonts.ge" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://cdn.web-fonts.ge/fonts/bpg-nino-mtavruli/css/bpg-nino-mtavruli.min.css" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://cdn.web-fonts.ge/fonts/bpg-arial/css/bpg-arial.min.css" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://cdn.web-fonts.ge/fonts/bpg-glaho/css/bpg-glaho.min.css" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://cdn.web-fonts.ge/fonts/bpg-nino-mtavruli-bold/css/bpg-nino-mtavruli-bold.min.css" crossOrigin="anonymous" />
      </head>
      <body className="antialiased bg-white text-slate-800">
        <ClientProviders>
          <Header />
          <div className="pt-16 xl:pt-28">
            {children}
          </div>
          <CookieConsent />
        </ClientProviders>
      </body>
    </html>
  );
}
