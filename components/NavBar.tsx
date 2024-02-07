"use client";
import { Flex, Heading, Spacer, Text } from "@chakra-ui/react";
import { ConnectKitButton } from "connectkit";
import NextLink from "next/link";
import { Link } from "@chakra-ui/react";

export const NavBar = () => {
  return (
    <Flex p={"2rem"}>
      <Link as={NextLink} href="/" color="white" p={"0.5rem"}>
        HOME
      </Link>
      <Link as={NextLink} href="/mint" color="white" p={"0.5rem"}>
        MINT
      </Link>
      <Link as={NextLink} href="/inspect" color={"white"} p={"0.5rem"}>
        INSPECT
      </Link>
      <Spacer />
      <ConnectKitButton />
    </Flex>
  );
};
