import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hypercert starter",
  description:
    "Quickly build a hypercert app powered by Next.js, ChakraUI and Wagmi",
};

// See: https://chakra-ui.com/getting-started/nextjs-app-guide#setup-layout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
