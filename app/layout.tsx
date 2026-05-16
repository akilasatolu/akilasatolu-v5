import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ContentInner } from "@/components/templates/ContentInner";
import { Footer } from "@/components/organisms/Footer";
import { GlobalNav } from "@/components/organisms/GlobalNav";
import { Header } from "@/components/organisms/Header";
import { JotaiProvider } from "@/components/providers/JotaiProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ThemeScript } from "@/components/providers/ThemeScript";
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
            suppressHydrationWarning
        >
            <head>
                <ThemeScript />
            </head>
            <body className="flex min-h-dvh flex-col flex-1 font-sans antialiased">
                <JotaiProvider>
                    <ThemeProvider>
                        <Header />
                        <GlobalNav />
                        <main className="flex min-h-0 flex-1 flex-col">
                            <ContentInner styles="flex min-h-0 flex-1 flex-col">
                                {children}
                            </ContentInner>
                        </main>
                        <Footer />
                    </ThemeProvider>
                </JotaiProvider>
            </body>
        </html>
    );
}
