import { Sora } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import ToastProvider from "@/components/reusables/Layout/ToastProvider";
import { ModalProvider } from "@/Context/modal";
import { AuthProvider } from "@/Context/auth";
import { CoursesProvider } from "@/Context/courses";

const inter = Sora({ subsets: ["latin"], weights: [400, 500, 600, 700] });

export const metadata = {
  title: "TechUnlock | Seamless learning for everyone",
  description: "Unlock your seamless learning experience.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <CoursesProvider>
            <ModalProvider>
              <ToastProvider>
                {children}
               {/*
                 <Analytics />
                <SpeedInsights />
                */}
              </ToastProvider>
            </ModalProvider>
          </CoursesProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
