import type { Metadata } from "next";
import type { Viewport } from "next";
import "@/styles/styles.scss";
import ReduxProvider from "./ReduxProvider";
import Providers from "./QueryProviders";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "WEEKLY-DIARY",
  description: "주간 일기 / TODO 리스트 앱",
  verification: {
    google: "rgDUJx1dCP9beayoTn1ayjT42HPrKGV0Hk4ZsN18KNY",
  },
  other: {
    "naver-site-verification": "d963822cab2587cfbddca3f64d87c50d5bf3d4ef",
    "apple-touch-startup-image": "url(/splash/iphone-14-pro.png)",
  },
  icons: {
    icon: "/imgs/favicon/favicon.ico",
    apple: "/imgs/favicon/apple-touch-icon.png",
  },
  appleWebApp: {
    // iOS PWA 활성화
    capable: true,
    statusBarStyle: "default",
    title: "WEEKLY",
    startupImage: "/imgs/favicon/apple-touch-icon.png",
  },
  manifest: "/imgs/favicon/site.webmanifest",
  openGraph: {
    title: "WEEKLY-DIARY",
    description: "초간단 주간관리형 TODO앱",
    url: "weekly-diary.com",
    siteName: "weekly-diary",
    images: [
      {
        url: "/imgs/Open-Graph.png",
        width: 1200,
        height: 630,
        alt: "주간관리TODO앱",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  interactiveWidget: "resizes-content",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        <Providers>
          <ReduxProvider>
            <div className="container">{children}</div>
          </ReduxProvider>
        </Providers>
      </body>
    </html>
  );
}
