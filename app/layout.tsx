import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "اعتبار سلامت | BNPL درمانی",
  description: "دموی تعاملی اعتبار سلامت برای اعتبارسنجی، قسط‌بندی و داشبورد بیمار.",
  manifest: "/manifest.json",
  themeColor: "#0f172a",
  appleWebApp: {
    capable: true,
    title: "اعتبار سلامت",
    statusBarStyle: "default"
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;700;800&display=swap"
          rel="stylesheet"
        />
        <meta name="application-name" content="اعتبار سلامت" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="اعتبار سلامت" />
      </head>
      <body>{children}</body>
    </html>
  );
}
