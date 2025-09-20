import type { Metadata } from "next";
import type { Viewport } from "next";
import "../styles/global-style";
import ReduxProvider from "./ReduxProvider";
import VersionChecker from "../components/VersionChecker";

export const metadata: Metadata = {
  title: "WEEKLY-DIARY",
  description: "주간 일기 / TODO 리스트 앱",
  icons: {
    icon: "/imgs/favicon/favicon.ico",
    apple: "/imgs/favicon/apple-touch-icon.png",
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
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <ReduxProvider>
        <body>
          <div className="container">{children}</div>
          <VersionChecker />
        </body>
      </ReduxProvider>
    </html>
  );
}
