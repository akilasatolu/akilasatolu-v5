import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "akilasatolu",
    description: "Akilasatolu's personal site featuring blog, photography, about me, and experience.",
    openGraph: {
        title: "akilasatolu",
        description:
            "Akilasatolu's personal site featuring blog, photography, about me, and experience.",
    },
    twitter: {
        card: "summary_large_image",
        title: "akilasatolu",
        description:
            "Akilasatolu's personal site featuring blog, photography, about me, and experience.",
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
            className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
        >
            <body className="flex min-h-dvh flex-col flex-1 font-sans antialiased">
                {children}
            </body>
        </html>
    );
}
