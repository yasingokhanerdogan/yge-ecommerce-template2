import { ReactNode } from "react";
import type { Metadata } from "next";
import Providers from "./providers";
import "./globals.css";
import DemoAnnouncement from "@/components/common/demoAnnouncement";

export const metadata: Metadata = {
  title: {
    default: "YGE Ecommerce Template2",
    template: "%s | YGE Ecommerce Template2",
  },
  description: "Advanced Ecommerce Template",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <DemoAnnouncement />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;
