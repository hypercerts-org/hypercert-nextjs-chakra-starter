"use client";
import { Link } from "@chakra-ui/next-js";
import Image from "next/image";
import { ConnectKitButton } from "connectkit";
import { Box, Divider, Flex, Heading, Spacer, Text } from "@chakra-ui/react";
import { useNetwork } from "wagmi";
import { HypercertClient } from "@hypercerts-org/sdk";
import { useEffect, useState, useMemo } from "react";

export default function Home() {
  const { chain } = useNetwork();
  const [firstHypercert, setFirstHypercert] = useState<any>();

  const client = useMemo(
    () =>
      chain ? new HypercertClient({ chain: { id: chain.id } }) : undefined,
    [chain]
  );

  useEffect(() => {
    if (client) {
      const getFirstHypercert = async () => {
        const firstHypercert = await client.indexer.firstClaims();
        if (firstHypercert.claims && firstHypercert.claims.length > 0)
          setFirstHypercert(firstHypercert.claims[0]);
      };

      getFirstHypercert();
    }
  }, [client]);

  return (
    <Flex
      direction={"column"}
      h={"100vh"}
      justifyContent={"space-between"}
      p={"2rem"}
      bgColor={"#304849"}
      color={"white"}
    >
      <Flex w={"100%"} justifyContent={"space-around"}>
        <Box
          maxW="sm"
          borderWidth="1px"
          borderRadius="lg"
          p={4}
          bgColor={"rgba(49, 74, 62, 0.5)"}
        >
          <Text>
            Get started by editing&nbsp;
            <Text as="kbd" fontWeight={"bold"}>
              app/page.tsx
            </Text>
          </Text>
        </Box>
        <Spacer />
        <ConnectKitButton />
      </Flex>

      <Flex
        direction={"column"}
        w={"100%"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Image
          src="/hypercerts_logo_yellow.png"
          alt="Hypercerts Logo"
          width={180}
          height={37}
          priority
        />
        {client && firstHypercert ? (
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
              {firstHypercert.id}
            </Text>
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
      </Flex>

      <Flex
        direction={"row"}
        p={"2em"}
        justifyContent={"space-around"}
        alignItems={"center"}
      >
        <Box
          w="sm"
          h="3xs"
          borderWidth="2px"
          borderRadius="lg"
          p={4}
          margin={"auto"}
          bgColor={"rgba(49, 74, 62, 0.5)"}
        >
          <Link
            href="https://hypercerts.org/docs/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Heading>
              Docs <span>-&gt;</span>
            </Heading>
            <Text>
              Find in-depth information about Hypercerts features and API.
            </Text>
          </Link>
        </Box>

        <Box
          w="sm"
          h="3xs"
          borderWidth="2px"
          borderRadius="lg"
          p={4}
          margin={"auto"}
          bgColor={"rgba(49, 74, 62, 0.5)"}
        >
          <Link
            href="https://github.com/hypercerts-org"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Heading>
              Code <span>-&gt;</span>
            </Heading>
            <p>Dive into the hypercerts repositories</p>
          </Link>
        </Box>

        <Box
          w="sm"
          h="3xs"
          borderWidth="2px"
          borderRadius="lg"
          p={4}
          margin={"auto"}
          bgColor={"rgba(49, 74, 62, 0.5)"}
        >
          <Link
            href="https://github.com/hypercerts-org/demo-apps"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Heading>
              Example apps <span>-&gt;</span>
            </Heading>
            <p>Explore starter templates for Hypercerts</p>
          </Link>
        </Box>
      </Flex>
    </Flex>
  );
}
