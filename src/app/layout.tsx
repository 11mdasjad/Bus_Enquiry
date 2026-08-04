import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Book Your Bus Journey | Simple Mart Bus Express",
  description:
    "Fill in your travel details and our team will contact you shortly with the best AC & Non-AC seater/sleeper bus options at guaranteed affordable rates.",
  keywords: [
    "bus booking",
    "simple mart reverse",
    "bus ticket inquiry",
    "AC bus booking",
    "sleeper bus",
    "seater bus",
    "bus travel",
  ],
  authors: [{ name: "Simple Mart Bus Express" }],
  openGraph: {
    title: "Book Your Bus Journey | Simple Mart Bus Express",
    description:
      "Fill in your travel details and our team will contact you shortly with the best bus options.",
    type: "website",
    locale: "en_US",
    siteName: "Simple Mart Bus Express",
  },
  twitter: {
    card: "summary_large_image",
    title: "Book Your Bus Journey | Simple Mart Bus Express",
    description:
      "Fill in your travel details and our team will contact you shortly with the best bus options.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} scroll-smooth`}>
      <body className={`${poppins.className} min-h-screen bg-slate-50 text-slate-900 antialiased`}>
        {children}
      </body>
    </html>
  );
}
