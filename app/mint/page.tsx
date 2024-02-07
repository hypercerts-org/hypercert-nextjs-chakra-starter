"use client";
import { Box, Flex, Heading, Spacer, Text } from "@chakra-ui/react";
import { HypercertMinter } from "@/components/HypercertMinter";
import { ConnectKitButton } from "connectkit";

export default function Home() {
  return (
    <Flex
      direction={"column"}
      justifyContent={"space-between"}
      p={"2rem"}
      color={"white"}
    >
      <Flex
        direction={"column"}
        w={"100%"}
        justifyContent={"center"}
        alignItems={"center"}
        p={"5rem"}
      >
        <HypercertMinter />
      </Flex>
    </Flex>
  );
}
