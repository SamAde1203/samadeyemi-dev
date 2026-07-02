import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const firaCode = Fira_Code({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL("https://samadeyemi.dev"),
  title: "Sam Adeyemi — Software Engineer, Generative AI",
  description:
    "Python, FastAPI, APIs & AI Workflow Systems. Building production systems that reduce errors by 73% and accelerate workflows by 85%.",
  keywords:
    "Software Engineer, Generative AI, Python, FastAPI, Machine Learning, Multi-Agent AI, Validation Pipelines, API Development, UK Tech",
  authors: [{ name: "Sam Adeyemi" }],
  creator: "Sam Adeyemi",
  openGraph: {
    title: "Sam Adeyemi — Software Engineer, Generative AI",
    description:
      "Building production AI systems that transform complex ideas into scalable software. 85% faster workflows, 73% fewer errors.",
    url: "https://samadeyemi.dev",
    siteName: "Sam Adeyemi Portfolio",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sam Adeyemi — Generative AI Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sam Adeyemi — Software Engineer, Generative AI",
    description:
      "Building production AI systems that transform complex ideas into scalable software.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.variable} ${firaCode.variable} font-sans antialiased`}>
        {children}
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Sam Adeyemi",
              jobTitle: "Software Engineer — Generative AI",
              url: "https://samadeyemi.dev",
              image: "https://samadeyemi.dev/headshot.jpg",
              email: "mailto:samoadeyemi@yahoo.co.uk",
              sameAs: [
                "https://github.com/SamAde1203",
                "https://linkedin.com/in/samadeyemi-apex",
              ],
              knowsAbout: [
                "Python",
                "FastAPI",
                "JavaScript",
                "TypeScript",
                "React",
                "Next.js",
                "REST APIs",
                "Workflow Automation",
                "Validation Pipelines",
                "Generative AI",
                "Multi-Agent AI Systems",
                "Machine Learning",
                "Cloud Computing",
                "DevOps",
              ],
              alumniOf: [
                {
                  "@type": "CollegeOrUniversity",
                  name: "University of Greater Manchester",
                },
                {
                  "@type": "CollegeOrUniversity",
                  name: "University of Bolton",
                },
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
