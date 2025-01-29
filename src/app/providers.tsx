"use client";

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { QueryProvider, ThemeProvider, TopbarProvider } from "@/context";
import { Toaster } from "react-hot-toast";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider>
      <QueryProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme={process.env.NEXT_PUBLIC_DEFAULT_THEME || "light"}
        >
          <TopbarProvider>
            {children}
            <Toaster
              position="top-right"
              reverseOrder={false}
              toastOptions={{ duration: 1000 }}
            />
          </TopbarProvider>
        </ThemeProvider>
      </QueryProvider>
    </SessionProvider>
  );
};

export default Providers;
