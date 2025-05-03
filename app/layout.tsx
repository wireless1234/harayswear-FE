import type { Metadata } from "next";
import { Encode_Sans } from "next/font/google";
// import localFont from "next/font/local";
import ReactQueryClientProvider from "@/providers/ReactQueryClientProvider";
import "./globals.css";

const encodeSans = Encode_Sans({
  variable: "--font-encode-sans",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

// // Local Font
// export const neutro = localFont({
//   src: "../public/fonts/Neutro-Bold.otf",
//   variable: "--font-neutro",
//   display: "swap",
// });

export const metadata: Metadata = {
  title: "Uncle V",
  description: "UncleV Ecommerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryClientProvider>
      <html lang="en">
        <body className={`${encodeSans.variable} antialiased`}>
          {children}
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
