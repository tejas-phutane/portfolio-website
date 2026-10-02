import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
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
  title: "Tejas Phutane | Robotics & Computer Vision Engineer",
  description:
    "Portfolio of Tejas Phutane — Senior Robotics & Computer Vision Engineer specializing in ROS/ROS2, DeepStream, autonomous systems, real-time vision pipelines, and production robotics deployment.",
  keywords: [
    "Tejas Phutane",
    "Robotics Engineer",
    "Computer Vision",
    "ROS2",
    "DeepStream",
    "NVIDIA",
    "Autonomous Systems",
    "Motion Planning",
    "YOLO",
    "TensorRT",
    "Industrial Automation",
    "Digital Twin",
  ],
  authors: [{ name: "Tejas Phutane" }],
  creator: "Tejas Phutane",
  robots: "index, follow",
  openGraph: {
    title: "Tejas Phutane | Robotics & Computer Vision Engineer",
    description:
      "Senior Robotics Engineer with 4+ years building production-grade autonomous systems, real-time vision pipelines, and multi-robot coordination for industrial automation.",
    url: "https://tejas-phutane-portfolio.web.app",
    siteName: "Tejas Phutane Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tejas Phutane | Robotics & Computer Vision Engineer",
    description:
      "Senior Robotics Engineer — ROS2, DeepStream, TensorRT, Production Robotics",
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
      suppressHydrationWarning
    >
      <body>{children}</body>
    </html>
  );
}
