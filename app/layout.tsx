import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tejas Phutane | Senior Robotics Engineer: Humanoid Robotics & Physical AI",
  description:
    "Portfolio of Tejas Phutane, Senior Robotics Engineer specializing in Humanoid Robotics, Physical AI, and Sim-to-Real Systems. Building robot-agnostic autonomy, safety-aware humanoid systems, and digital twins.",
  keywords: [
    "Tejas Phutane",
    "Robotics Engineer",
    "Humanoid Robotics",
    "Physical AI",
    "Sim-to-Real",
    "Unitree G1",
    "Isaac Sim",
    "ROS2",
    "Computer Vision",
    "DeepStream",
    "Autonomous Systems",
    "Motion Planning",
    "TensorRT",
    "Digital Twin",
  ],
  authors: [{ name: "Tejas Phutane" }],
  creator: "Tejas Phutane",
  robots: "index, follow",
  openGraph: {
    title: "Tejas Phutane | Senior Robotics Engineer: Humanoid Robotics & Physical AI",
    description:
      "Senior Robotics Engineer specializing in Humanoid Robotics, Physical AI, and Sim-to-Real Systems. Building robot-agnostic autonomy, safety-aware humanoid systems, and digital twins.",
    url: "https://tejas-phutane-portfolio.web.app",
    siteName: "Tejas Phutane Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tejas Phutane | Senior Robotics Engineer: Humanoid Robotics & Physical AI",
    description:
      "Senior Robotics Engineer specializing in Humanoid Robotics, Physical AI, and Sim-to-Real Systems.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
