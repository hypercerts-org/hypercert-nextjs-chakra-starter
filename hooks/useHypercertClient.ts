"use client";
import {HypercertClient} from "@hypercerts-org/sdk";
import {useMemo} from "react";
import {useChainId, usePublicClient, useWalletClient} from "wagmi";

export const useHypercertClient = () => {
    const {data: walletClient} = useWalletClient();
    const publicClient = usePublicClient();

    const client = useMemo(
        () =>
            new HypercertClient({
                environment: "test",
                publicClient,
                walletClient: walletClient ?? undefined,
            }),
        [publicClient, walletClient]
    );

    return {client};
};
