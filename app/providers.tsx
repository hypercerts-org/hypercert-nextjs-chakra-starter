"use client";

import {ChakraProvider} from "@chakra-ui/react";
import {WagmiProvider, createConfig, http} from "wagmi";
import {assertExists} from "./utils";
import theme from "./theme";
import {sepolia, baseSepolia} from "wagmi/chains";
import {ConnectKitProvider, getDefaultConfig} from "connectkit";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient();

const alchemyId = assertExists(
    process.env.NEXT_PUBLIC_ALCHEMY_ID,
    "Alchemy ID not found"
);

// See: https://docs.family.co/connectkit/getting-started#getting-started-section-3-implementation
const wagmiConfig = createConfig(
    getDefaultConfig({
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
        chains: [sepolia, baseSepolia],
        transports: {
            [sepolia.id]: http(`https://eth-sepolia.g.alchemy.com/v2/${alchemyId}`),
            [baseSepolia.id]: http(`https://base-sepolia.g.alchemy.com/v2/${alchemyId}`),
        }
    })
);

export function Providers({children}: { children: React.ReactNode }) {
    return (
        <ChakraProvider theme={theme}>
            <WagmiProvider config={wagmiConfig}>
                <QueryClientProvider client={queryClient}>
                    <ConnectKitProvider>{children}</ConnectKitProvider>
                </QueryClientProvider>
            </WagmiProvider>
        </ChakraProvider>
    );
}
