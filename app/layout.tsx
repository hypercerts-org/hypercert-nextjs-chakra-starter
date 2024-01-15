import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import { Container } from "@chakra-ui/react";

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
        <Providers>
          <Container minH={"100vh"} minW={"100%"} p={0} bgColor={"#304849"}>
            {children}
          </Container>
        </Providers>
      </body>
    </html>
  );
}
