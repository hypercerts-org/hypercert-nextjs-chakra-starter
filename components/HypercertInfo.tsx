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

const HypercertInfo = ({ uri }: { uri: string }) => {
  const { client } = useHypercertClient();
  const [metaData, setMetaData] = useState<HypercertMetadata>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (client) {
      setIsLoading(false);
      const getHypercertMetaData = async () => {
        const metadata = await client.storage.getMetadata(uri);
        const { data, valid, errors } = validateMetaData(metadata);
        if (valid) {
          console.log(data);
          setMetaData(data as HypercertMetadata);
        } else {
          console.log(errors);
        }
      };

      getHypercertMetaData();
    }
  }, [client, uri]);

  if (isLoading) {
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
                  <Text>{metaData.name}</Text>
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <Heading size={"sm"}>Description</Heading>
                </Td>
                <Td>
                  <Text>{metaData.description}</Text>
                </Td>
              </Tr>
            </Tbody>
          </Table>
          <Image src={metaData.image} alt="Follow us on Twitter" height={400} />
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
