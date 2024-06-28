"use client";
import { Divider, Flex, Spinner, Text } from "@chakra-ui/react";
import HypercertInfo from "./HypercertInfo";
import { ConnectKitButton } from "connectkit";
import { graphql } from "gql.tada";
import { useQuery } from "urql";

type HypercertFetcherProps = {
  hypercertId: string;
};

const QUERY = graphql(`
  query HypercertsById($contains: String!) {
    hypercerts(first: 10, where: { hypercert_id: { eq: $contains } }) {
      data {
        hypercert_id
        units
        uri
      }
    }
  }
`);

export const HypercertFetcher = ({ hypercertId }: HypercertFetcherProps) => {

  const [result] = useQuery({
    query: QUERY,
    variables: { contains: hypercertId },
  });

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
        <Text>Loading Hypercert SDK client...</Text>
        <Spinner size="xl" />
      </Flex>
    );
  }

  const { hypercerts } = data;

  console.log("hypercerts", hypercerts);

  if (!error) {
    return (
      <Flex
        mt="2em"
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={"1em"}
      >
        <Text>Please provide a valid hypercert ID</Text>
      </Flex>
    );
  }

  return (
    <>
      {hypercerts ? (
        <Flex
          mt="2em"
          direction={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Divider my="2em" w={"sm"} />
          <Text>First Hypercert ID:</Text>
          <Text as="kbd" fontWeight={"bold"}>
            {result ? hypercerts[0].id : "Loading..."}
          </Text>
          {hypercerts && hypercerts[0].uri ? (
            <HypercertInfo uri={hypercerts[0].uri} />
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
