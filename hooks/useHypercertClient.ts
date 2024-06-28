"use client";
import { Environment, HypercertClient } from "@hypercerts-org/sdk";
import { useMemo } from "react";
import { useWalletClient } from "wagmi";

export const useHypercertClient = () => {
  const { data: walletClient } = useWalletClient();

  const client = useMemo(
    () =>
      new HypercertClient({
        environment: "production",
        // @ts-ignore - wagmi and viem have different typing
        walletClient,
      }),
    [walletClient]
  );

  return { client };
};
