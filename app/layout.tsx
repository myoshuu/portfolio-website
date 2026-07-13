import type { Metadata } from "next";
import { Poppins, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import CustomCursor from "@/components/CustomCursor";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeToggle } from "@/components/ThemeToggle";
import SocialSidebar from "@/components/SocialSidebar";
import Navbar from "@/components/Navbar";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Joevano Pangangkat – Website Developer",
  description: "Portfolio website of Joevano",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        poppins.variable,
        instrumentSerif.variable,
        "font-sans"
      )}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <NextThemesProvider
          attribute="data-theme"
          defaultTheme="dark"
          enableSystem={false}
          enableColorScheme={false}
        >
          {/* Global Theme Wipe Target */}
          <div className="theme-wipe-target fixed inset-0 z-[999999] pointer-events-none overflow-hidden" />
          
          <Navbar />
          <SocialSidebar />
          <CustomCursor />
          {children}
        </NextThemesProvider>
      </body>
    </html>
  );
}
