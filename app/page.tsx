"use client";
import { Link } from "@chakra-ui/next-js";
import Image from "next/image";
import { Box, Flex, Heading, Spacer, Text } from "@chakra-ui/react";
import ClientInfo from "../components/ClientInfo";
import { ConnectKitButton } from "connectkit";

export default function Home() {
  return (
    <Flex
      direction={"column"}
      justifyContent={"space-between"}
      p={"2rem"}
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
        <ClientInfo />
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
