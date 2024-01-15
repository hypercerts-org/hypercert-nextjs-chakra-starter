"use client";
import { HypercertClient } from "@hypercerts-org/sdk";
import { useMemo } from "react";
import { useChainId, useWalletClient } from "wagmi";

export const useHypercertClient = () => {
  const chainId = useChainId();
  const { data: walletClient, isError, isLoading } = useWalletClient();

  // The SDK will throw an error if the chain is not supported
  const isSupportedChain = (chainId: number) => {
    return chainId === 10 || chainId === 11155111 || chainId === 42220;
  };

  const client = useMemo(
    () =>
      chainId && isSupportedChain(chainId)
        ? new HypercertClient({
            chain: { id: chainId },
            walletClient: walletClient ?? undefined,
          })
        : undefined,
    [chainId, walletClient]
  );

  return { client };
};
