import "./../globals.css";

export const metadata = {
  title: "App - Overlay",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`bg-transparent`}>
      <head>
        <meta name="robots" content="noindex,nofollow" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className="bg-transparent">{children}</body>
    </html>
  );
}
