"use client";
import { useHypercertClient } from "@/hooks/useHypercertClient";
import { Flex, Text, Divider, Spinner } from "@chakra-ui/react";
import HypercertInfo from "./HypercertInfo";
import { ConnectKitButton } from "connectkit";
import { graphql } from "gql.tada";
import { useQuery } from "urql";

const QUERY = graphql(`
  query HypercertsByBlockNumber {
    hypercerts(sort: { by: { hypercert_id: ascending } }, first: 10) {
      data {
        hypercert_id
        uri
      }
    }
  }
`);

const ClientInfo = () => {
  const { client } = useHypercertClient();
  const [result] = useQuery({
    query: QUERY,
  });

  if (!client) {
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

  const { data, fetching, error } = result;

  if (fetching) {
    return (
      <Flex
        mt="2em"
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={"1em"}
      >
        <Text>Loading hypercert data...</Text>
        <Spinner size="xl" />
      </Flex>
    );
  }

  console.log(data);

  const hypercert = data?.hypercerts?.data[0];

  return (
    <>
      {client && hypercert ? (
        <Flex
          mt="2em"
          direction={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Text>
            Hypercert SDK client connected to{" "}
            <Text as="kbd" fontWeight={"bold"}>
              {client._config.environment}
            </Text>
          </Text>
          <Divider my="2em" w={"sm"} />
          <Text>First Hypercert ID:</Text>
          <Text as="kbd" fontWeight={"bold"}>
            {hypercert ? hypercert.hypercert_id : "Loading..."}
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

export default ClientInfo;
