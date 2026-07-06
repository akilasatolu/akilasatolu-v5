import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import { ContentInner } from "@/components/templates/ContentInner";
import { Footer } from "@/components/organisms/Footer";
import { Header } from "@/components/organisms/Header";
import { BreadcrumbProvider } from "@/components/providers/BreadcrumbProvider";
import "@/styles/globals.css";

const ibmPlexMono = IBM_Plex_Mono({
    subsets: ["latin"],
    variable: "--font-ibm-plex-mono",
    weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
    title: "akilasatolu",
    description: "Akilasatolu's personal site featuring blog and experience.",
    manifest: "/site.webmanifest",
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#ffffff" },
        { media: "(prefers-color-scheme: dark)", color: "#2b2b2b" },
    ],
    openGraph: {
        title: "akilasatolu",
        description:
            "Akilasatolu's personal site featuring blog and experience.",
    },
    twitter: {
        card: "summary_large_image",
        title: "akilasatolu",
        description:
            "Akilasatolu's personal site featuring blog and experience.",
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
            className={`${ibmPlexMono.variable} ${ibmPlexMono.className} h-full antialiased`}
        >
            <body className="m-0 flex min-h-dvh w-full flex-col p-0 font-sans antialiased">
                <BreadcrumbProvider>
                    <Header />
                    <main className="flex min-h-0 w-full flex-1 flex-col items-center">
                        <ContentInner className="flex min-h-0 w-full flex-1 flex-col">
                            {children}
                        </ContentInner>
                    </main>
                    <Footer />
                </BreadcrumbProvider>
            </body>
        </html>
    );
}
