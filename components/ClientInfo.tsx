"use client";
import { useHypercertClient } from "@/hooks/useHypercertClient";
import { useIndexer } from "@/hooks/useIndexer";
import { Flex, Text, Divider, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import HypercertInfo from "./HypercertInfo";
import { ConnectKitButton } from "connectkit";

const ClientInfo = () => {
  const { client } = useHypercertClient();
  const { indexer } = useIndexer();
  const [firstHypercert, setFirstHypercert] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (indexer) {
      setIsLoading(false);
      const getFirstHypercert = async () => {
        const firstHypercert = await indexer.firstClaims();
        if (firstHypercert.claims && firstHypercert.claims.length > 0)
          console.log(firstHypercert);
        setFirstHypercert(firstHypercert.claims[0]);
      };

      getFirstHypercert();
    }
  }, [indexer]);

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
            {firstHypercert ? firstHypercert.id : "Loading..."}
          </Text>
          {firstHypercert && firstHypercert?.uri ? (
            <HypercertInfo uri={firstHypercert.uri} />
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

export default ClientInfo;
