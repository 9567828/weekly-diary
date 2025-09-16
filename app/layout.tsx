import type { Metadata } from "next";
import type { Viewport } from "next";
import "../styles/global-style";
import ReduxProvider from "./ReduxProvider";
import VersionChecker from "./../components/VversionChecker";

export const metadata: Metadata = {
  title: "WEEKLY-PLAN",
  description: "주간 일기 / TODO 리스트 앱",
  icons: {
    icon: "/imgs/favicon/favicon.ico",
    apple: "/imgs/favicon/apple-touch-icon.png",
  },
  manifest: "/imgs/favicon/site.webmanifest",
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
