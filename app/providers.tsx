"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { WagmiConfig, createConfig } from "wagmi";
import { assertExists } from "./utils";
import theme from "./theme";
import { sepolia, optimism, celo } from "wagmi/chains";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";

const chains = [sepolia, optimism, celo];

// See: https://docs.family.co/connectkit/getting-started#getting-started-section-3-implementation
const wagmiConfig = createConfig(
  getDefaultConfig({
    // Required API Keys
    alchemyId: assertExists(
      process.env.NEXT_PUBLIC_ALCHEMY_ID,
      "Alchemy ID not found"
    ), // or infuraId
    walletConnectProjectId: assertExists(
      process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
      "WalletConnect project ID not found"
    ),

    // Required
    appName: "Hypercert starter app",

    // Optional
    appDescription:
      "Hypercert starter app powered by Next.js, ChakraUI and Wagmi",
    appUrl: "https://example.com", // your app's url
    appIcon: "/public/hc_logo_400_400.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
    chains,
  })
);

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={theme}>
      <WagmiConfig config={wagmiConfig}>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </WagmiConfig>
    </ChakraProvider>
  );
}
