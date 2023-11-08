import "server-only";

import { Analytics } from "@vercel/analytics/react";
import { Metadata } from "next";
import Link from "next/link";
import { PropsWithChildren } from "react";
import { ThemeProvider } from "../../components/theme-provider";
import { ThemeToggle } from "../theme-toggle";
import "./../globals.css";
import NavTabs from "./nav-tabs";

// do not cache this layout
export const revalidate = 0;

export const metadata: Metadata = {
  title: "App",
};

export default async function RootLayout({
  children,
}: PropsWithChildren<unknown>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className={`min-h-screen w-full bg-gray-50 dark:bg-slate-950`}>
            <div className="sticky left-0 right-0 top-0 z-30 border-b border-gray-200 bg-white dark:border-slate-800 dark:bg-slate-900">
              <div className="mx-auto max-w-screen-xl px-2.5 md:px-20">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <Link href="/app">
                      <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-emerald-400 to-cyan-500">
                        App
                      </div>
                    </Link>
                  </div>
                  <div className="flex flex-shrink-0 items-center gap-x-2">
                    <ThemeToggle />
                  </div>
                </div>
                <NavTabs />
              </div>
            </div>
            <div>{children}</div>
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
