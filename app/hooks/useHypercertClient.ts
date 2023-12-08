"use client";
import { HypercertClient } from "@hypercerts-org/sdk";
import { useMemo, useState } from "react";
import { useNetwork } from "wagmi";

const useHypercertClient = () => {
  const { chain } = useNetwork();

  // The SDK will throw an error if the chain is not supported
  const isSupportedChain = (chainId: number) => {
    return (
      chainId === 5 ||
      chainId === 10 ||
      chainId === 11155111 ||
      chainId === 42220
    );
  };

  const client = useMemo(
    () =>
      chain && isSupportedChain(chain.id)
        ? new HypercertClient({ chain: { id: chain.id } })
        : undefined,
    [chain]
  );

  return { client };
};

export { useHypercertClient };
