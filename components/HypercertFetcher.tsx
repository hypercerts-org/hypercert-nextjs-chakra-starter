"use client";
import { useHypercertClient } from "@/hooks/useHypercertClient";
import { useIndexer } from "@/hooks/useIndexer";
import { Flex, Text, Divider, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import HypercertInfo from "./HypercertInfo";
import { ConnectKitButton } from "connectkit";

type HypercertFetcherProps = {
  claimId: string;
};

export const HypercertFetcher = ({ claimId }: HypercertFetcherProps) => {
  const { client } = useHypercertClient();
  const { indexer } = useIndexer();
  const [hypercert, sethypercert] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (indexer) {
      setIsLoading(false);
      const gethypercert = async () => {
        const hypercert = await indexer.claimById(claimId);
        console.log(hypercert);

        if (hypercert.claim) console.log(hypercert);
        sethypercert(hypercert.claim);
      };

      gethypercert();
    }
  }, [indexer, claimId]);

  if (isLoading) {
    return (
      <Flex
        mt="2em"
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={"1em"}
      >
        <Text>Loading Hypercert SDK client...</Text>
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (!claimId) {
    return (
      <Flex
        mt="2em"
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={"1em"}
      >
        <Text>Please provide a valid claim ID</Text>
      </Flex>
    );
  }

  return (
    <>
      {client && indexer ? (
        <Flex
          mt="2em"
          direction={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Text>
            Hypercert SDK client connected to{" "}
            <Text as="kbd" fontWeight={"bold"}>
              {client._config.chain?.name}
            </Text>
          </Text>
          <Divider my="2em" w={"sm"} />
          <Text>First Hypercert ID:</Text>
          <Text as="kbd" fontWeight={"bold"}>
            {hypercert ? hypercert.id : "Loading..."}
          </Text>
          {hypercert && hypercert?.uri ? (
            <HypercertInfo uri={hypercert.uri} />
          ) : (
            <Text>No URI found</Text>
          )}
        </Flex>
      ) : (
        <Flex
          mt="2em"
          direction={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Text mb={"2em"}>Hypercert SDK client not connected</Text>
          <ConnectKitButton />
        </Flex>
      )}
    </>
  );
};
