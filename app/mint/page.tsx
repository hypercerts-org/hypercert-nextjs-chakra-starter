"use client";
import {Flex} from "@chakra-ui/react";
import {HypercertMinter} from "@/components/HypercertMinter";

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
