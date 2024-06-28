"use client";
import { useHypercertClient } from "@/hooks/useHypercertClient";
import {
  Flex,
  Text,
  Heading,
  Spinner,
  Image,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { HypercertMetadata, validateMetaData } from "@hypercerts-org/sdk";
import { useQuery } from "urql";
import { graphql } from "gql.tada";

const QUERY = graphql(`
  query metadataByUri($contains: String!) {
    metadata(first: 10, where: { uri: { contains: $contains } }) {
      data {
        uri
        name
        description
        image
      }
    }
  }
`);

const HypercertInfo = ({ uri }: { uri: string }) => {
  const [metaData, setMetaData] = useState<HypercertMetadata>();

  const [result] = useQuery({
    query: QUERY,
    variables: { contains: uri },
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
        <Text>{`Loading Hypercert metadata from ${uri}`}</Text>
        <Spinner size="xl" />
      </Flex>
    );
  }

  const metadata = data.metadata[0];

  return (
    <>
      {metaData ? (
        <Flex
          mt="2em"
          direction={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={"1em"}
        >
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Property</Th>
                <Th>Value</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>
                  <Heading size={"sm"}>Name</Heading>
                </Td>
                <Td>
                  <Text>{metadata.name}</Text>
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <Heading size={"sm"}>Description</Heading>
                </Td>
                <Td>
                  <Text>{metadata.description}</Text>
                </Td>
              </Tr>
            </Tbody>
          </Table>
          <Image src={metadata.image} alt="Follow us on Twitter" height={400} />
        </Flex>
      ) : (
        <Flex
          mt="2em"
          direction={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Text mb={"2em"}>
            No Hypercert metadata found at{" "}
            <Text as="kbd" fontWeight={"bold"}>
              {uri}
            </Text>
          </Text>
        </Flex>
      )}
    </>
  );
};

export default HypercertInfo;
