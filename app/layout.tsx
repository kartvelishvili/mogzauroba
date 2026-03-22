import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/app/components/Header";
import CookieConsent from "@/app/components/CookieConsent";

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
};

export const metadata: Metadata = {
  metadataBase: new URL("https://biujeturi.ge"),
  title: {
    default: "Biujeturi.ge — სამოგზაურო პლატფორმა",
    template: "%s | Biujeturi.ge",
  },
  description:
    "ავიაბილეთები, სასტუმროები, ტურები, ტრანსფერები და სამოგზაურო სერვისები ერთიან ჭკვიან ძიებაში.",
  openGraph: {
    title: "Biujeturi.ge",
    description:
      "იპოვე ფრენები, სასტუმროები, ტურები და ტრანსფერები ერთ თანამედროვე სამოგზაურო პლატფორმაზე.",
    type: "website",
    locale: "ka_GE",
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
        <link rel="stylesheet" href="https://cdn.web-fonts.ge/fonts/bpg-nino-mtavruli/css/bpg-nino-mtavruli.min.css" />
        <link rel="stylesheet" href="https://cdn.web-fonts.ge/fonts/bpg-arial/css/bpg-arial.min.css" />
        <link rel="stylesheet" href="https://cdn.web-fonts.ge/fonts/bpg-glaho/css/bpg-glaho.min.css" />
        <link rel="stylesheet" href="https://cdn.web-fonts.ge/fonts/bpg-nino-mtavruli-bold/css/bpg-nino-mtavruli-bold.min.css" />
     
<script data-noptimize="1" data-cfasync="false" data-wpfc-render="false">
  (function () {
      var script = document.createElement("script");
      script.async = 1;
      script.src = 'https://emrldco.com/NTEwNTAw.js?t=510500';
      document.head.appendChild(script);
  })();
</script>

      </head>
      <body className="antialiased bg-white text-slate-800">
        <Header />
        <div className="pt-16 xl:pt-28">
          {children}
        </div>
        <CookieConsent />
      </body>
    </html>
  );
}
